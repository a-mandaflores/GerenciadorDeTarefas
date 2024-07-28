using Azure.Core;
using GestaoDeTarefas.DTOs;
using GestaoDeTarefas.Models;
using GestaoDeTarefas.Repository;
using GestaoDeTarefas.Service;
using GestaoDeTarefas.ViewObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System.Diagnostics;


namespace GestaoDeTarefas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityService _activityService;
        public ActivityController(IActivityService activityService)
        {
            _activityService = activityService;
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerOperation(Summary = "Lista de Tasks", Description = "Este metodo é responsável por trazer todas as tasks")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var activitys = await _activityService.GetAllAsync();
                return Ok(activitys);
            }
            catch(KeyNotFoundException) {
                return NotFound("Activity not found.");
            }
            
            
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerOperation(Summary = "Retorna uma Tasks", Description = "Este metodo é responsável por trazer uma tasks")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var activity = await _activityService.GetByIdAsync(id);
                return Ok(activity);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Activity not found.");
            }
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [SwaggerOperation(Summary = "Criar Task", Description = "Este metodo é responsável pela criação das Tasks")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ActivityCreateRequest request)
        {
            if (request == null)
            {
                return BadRequest("No content in body");
            }

            try
            {
                await _activityService.CreateAsync(request);
                return CreatedAtAction(nameof(GetAll), null, null);

            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex}");
            }

        }

        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerOperation(Summary = "Delete Task", Description = "Este metodo é responsável pela exclusão das Tasks")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {

                await _activityService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Activity not found.");
            }
            
        }

        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerOperation(Summary = "Atualizar Task", Description = "Este metodo é responsável pela atualização das Tasks")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] ActivityUpdateRequest request, Guid id)
        {
            if(request == null)
            {
                return BadRequest("Resquest is not null");
            }
            try
            {
                await _activityService.UpdateAsync(request, id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Activity not found.");
            }
            

        }
        

    }
}

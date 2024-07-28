using GestaoDeTarefas.DTOs;
using GestaoDeTarefas.ViewObject;
using Microsoft.AspNetCore.Mvc;

namespace GestaoDeTarefas.Service
{
    public interface IActivityService
    {
        Task CreateAsync(ActivityCreateRequest request);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<ActivityReadRequest>> GetAllAsync();
        Task<ActivityReadRequest> GetByIdAsync(Guid id);
        Task UpdateAsync(ActivityUpdateRequest activity, Guid id);

    }
}

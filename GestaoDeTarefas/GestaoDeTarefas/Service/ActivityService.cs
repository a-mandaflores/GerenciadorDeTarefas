using Azure.Core;
using GestaoDeTarefas.DTOs;
using GestaoDeTarefas.Models;
using GestaoDeTarefas.Repository;
using GestaoDeTarefas.ViewObject;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Globalization;

namespace GestaoDeTarefas.Service
{
    public class ActivityService : IActivityService
    {
        private readonly IActivityRepository _activityRepository;

        public ActivityService(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }

        public async Task CreateAsync(ActivityCreateRequest request)
        {
            string formattedDate = request.DueDate.ToString("yyyy-MM-dd");
            DateTime paseDate = DateTime.ParseExact(formattedDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            

            var activity = new Activity
            {
                Title = request.Title,
                Description = request.Description,
                DueDate = paseDate,
                Priority = request.Priority,
            };
            
            await _activityRepository.CreateAsync(activity);
        }

        public async Task DeleteAsync(Guid id)
        {
           await _activityRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<ActivityReadRequest>> GetAllAsync()
        {

            var activities = await _activityRepository.GetAllAsync();
            var activityReadRequests = activities
                .Select(x => new ActivityReadRequest
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    DueDate = x.DueDate,
                    Priority = x.Priority
                });

            return activityReadRequests;
        }

        public async Task<ActivityReadRequest> GetByIdAsync(Guid id)
        {
            var activity = await _activityRepository.GetByIdAsync(id);
            if (activity == null)
            {
                throw new KeyNotFoundException("Activity not found.");

            }

            var activityReadRequests = new ActivityReadRequest
            {
                Id = activity.Id,
                Title = activity.Title,
                Description = activity.Description,
                DueDate = activity.DueDate,
                Priority = activity.Priority.ToString(),
            };

            return activityReadRequests;

        }

        public async Task UpdateAsync(ActivityUpdateRequest request, Guid id)
        {
            var activity = await _activityRepository.GetByIdAsync(id);
            if (activity == null)
            {
                throw new KeyNotFoundException("Activity not found.");

            }

            activity.Title = request.Title;
            activity.Description = request.Description;
            activity.DueDate = request.DueDate;
            activity.Priority = request.Priority;

            await _activityRepository.UpdateAsync(activity);

        }

       
    }

    
}
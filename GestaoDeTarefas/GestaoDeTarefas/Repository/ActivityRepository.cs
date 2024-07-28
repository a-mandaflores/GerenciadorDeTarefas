using Microsoft.EntityFrameworkCore; // Certifique-se de usar o Entity Framework Core
using GestaoDeTarefas.Data;
using GestaoDeTarefas.Models;
using GestaoDeTarefas.ViewObject;
using Microsoft.AspNetCore.Mvc;

namespace GestaoDeTarefas.Repository
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly ActivityContext _context;

        public ActivityRepository(ActivityContext context) => _context = context;

        public async Task CreateAsync(Activity activity)
        {
            try
            {
                _context.Activitys.Add(activity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new BadHttpRequestException("Error while creating activity", ex);
            }
        }

        public async Task DeleteAsync(Guid id)
        {
            var activity = await _context.Activitys.FindAsync(id);
            if (activity == null)
            {
                throw new KeyNotFoundException("Activity not found.");
            }

            _context.Activitys.Remove(activity);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new BadHttpRequestException("Error while delete activity", ex);

            }


        }

        public async Task<List<Activity>> GetAllAsync()
        {
            return await _context.Activitys
                .OrderBy(x => x.DueDate)
                .ToListAsync();
        }

        public async Task<Activity> GetByIdAsync(Guid id)
        {
            var activity = await _context.Activitys.FirstOrDefaultAsync(x => x.Id == id);
            if (activity == null)
            {
                throw new KeyNotFoundException("Activity not found.");
            }

            return activity;


        }

        public async Task UpdateAsync(Activity activity)
        {
            try
            {
                _context.Activitys.Update(activity);
                await _context.SaveChangesAsync();
            }
            catch (KeyNotFoundException)
            {
                throw new KeyNotFoundException("Activity not found.");
            }

        }
    }
}

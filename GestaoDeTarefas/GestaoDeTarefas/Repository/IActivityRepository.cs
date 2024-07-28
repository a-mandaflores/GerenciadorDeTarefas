
using GestaoDeTarefas.Models;

namespace GestaoDeTarefas.Repository
{
    public interface IActivityRepository
    {

        Task<List<Activity>> GetAllAsync();
        Task<Activity> GetByIdAsync(Guid id);
        Task CreateAsync(Activity activity);
        Task DeleteAsync(Guid id);
        Task UpdateAsync(Activity activity);

    }

}

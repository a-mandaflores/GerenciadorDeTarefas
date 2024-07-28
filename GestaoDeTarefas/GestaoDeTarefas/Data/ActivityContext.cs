using GestaoDeTarefas.Models;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeTarefas.Data
{
    public class ActivityContext : DbContext
    {
        public ActivityContext(DbContextOptions<ActivityContext> options) : base(options)
        {
        }

        public DbSet<Activity> Activitys { get; set; }
    }
}
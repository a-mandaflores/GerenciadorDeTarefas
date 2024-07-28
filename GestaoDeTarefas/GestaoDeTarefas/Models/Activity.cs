using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoDeTarefas.Models
{
    [Table("activity")]
    public class Activity
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Column("title")]
        public string Title { get; set; } = string.Empty!;
        [Column("description")]

        public string Description { get; set; } = string.Empty;
        [Column("due_date")]

        public DateTime DueDate { get; set; } = default!;
        [Column("priority")]

        public string Priority { get; set; } = default!;

    }
}

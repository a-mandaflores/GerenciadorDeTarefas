using Microsoft.VisualBasic;

namespace GestaoDeTarefas.ViewObject
{
    public class ActivityCreateRequest 
    {
        public string Title { get; set; } = string.Empty!;
        public string Description { get; set; } = string.Empty!;
        public DateTime DueDate { get; set; } = default!;

        public string Priority { get; set; } = default!;

    }
}

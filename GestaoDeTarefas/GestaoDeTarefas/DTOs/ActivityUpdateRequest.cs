namespace GestaoDeTarefas.DTOs
{
    public class ActivityUpdateRequest
    {
       
            public string Title { get; set; }
            public string Description { get; set; }
            public DateTime DueDate { get; set; }
            public string Priority { get; set; }
        
    }
}

namespace GestaoDeTarefas.Exceptions
{
    public class BadRequestExceptions : Exception
    {
        public BadRequestExceptions() { }

        public BadRequestExceptions(string message)
            : base(message) { }

        public BadRequestExceptions(string message, Exception innerException)
            : base(message, innerException) { }
    }
}

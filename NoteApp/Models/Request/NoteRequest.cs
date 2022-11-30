using System.ComponentModel.DataAnnotations;

namespace NoteApp.Models.Request
{
    public class NoteRequest
    {
        [Required]
        public string Title { get; set; } = default!;
        [Required]
        public string Description { get; set; } = default!;
    }
}

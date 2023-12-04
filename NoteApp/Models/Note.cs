using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteApp.Models
{
    public class Note
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public List<string> Tags { get; set; } = default!;
        public DateTimeOffset CreateDateTimeOffset { get; set; }
        public DateTimeOffset UpdateDateTimeOffset { get; set; }
    }
}

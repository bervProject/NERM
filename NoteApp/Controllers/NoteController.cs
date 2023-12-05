using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using NoteApp.Models;
using NoteApp.Models.Request;

namespace NoteApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : ControllerBase
    {

        private readonly ILogger<NoteController> _logger;
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<Note> _notesCollection;

        public NoteController(MongoClient mongoClient, ILogger<NoteController> logger)
        {
            _logger = logger;
            _database = mongoClient.GetDatabase("noteapp");
            _notesCollection = _database.GetCollection<Note>("notes");
        }

        [HttpGet]
        public async Task<IEnumerable<Note>> GetAsync([FromQuery] string keyword = "")
        {
            var filterBuilder = new FilterDefinitionBuilder<Note>();
            var withKeyword = !string.IsNullOrWhiteSpace(keyword);
            FilterDefinition<Note> def;
            if (withKeyword)
            {
                def = filterBuilder.Where(x => x.Title.Contains(keyword) || x.Description.Contains(keyword));
            }
            else
            {
                def = filterBuilder.Empty;
            }
            var response = await _notesCollection.FindAsync(def);
            var responseData = new List<Note>();
            while (response != null && (await response.MoveNextAsync()))
            {
                responseData.AddRange(response.Current);
            }

            return responseData;
        }

        [HttpGet("{id:guid}")]
        public async Task<Note?> GetAsyncById(Guid id)
        {
            var response = await _notesCollection.FindSync(note => note.Id == id).FirstAsync();
            return response;
        }

        [HttpPost]
        public async Task<Note> PostAsync(NoteRequest request)
        {
            var note = new Note
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Description = request.Description,
                Tags = request.Tags,
                CreateDateTimeOffset = DateTimeOffset.Now,
                UpdateDateTimeOffset = DateTimeOffset.Now
            };
            await _notesCollection.InsertOneAsync(note);
            return note;
        }

        [HttpPut("{id:guid}")]
        public async Task<object> PutAsync(Guid id, NoteRequest request)
        {
            var filterBuilder = new FilterDefinitionBuilder<Note>();
            var updateBuilder = new UpdateDefinitionBuilder<Note>();
            var updateDefinition = updateBuilder
                .Set(x => x.Title, request.Title)
                .Set(x => x.Description, request.Description)
                .Set(x => x.Tags, request.Tags)
                .Set(x => x.UpdateDateTimeOffset, DateTimeOffset.Now);
            await _notesCollection.UpdateOneAsync(filterBuilder.Eq(x => x.Id, id), updateDefinition);
            return new { Id = id };
        }

        [HttpDelete("{id:guid}")]
        public async Task<object> DeleteAsync(Guid id)
        {
            var filterBuilder = new FilterDefinitionBuilder<Note>();
            await _notesCollection.DeleteOneAsync(filterBuilder.Eq(x => x.Id, id));
            return new { Id = id };
        }
    }
}
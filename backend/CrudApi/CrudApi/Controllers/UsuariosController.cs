using CrudApi.Models;
using CrudApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CrudApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }
        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Usuario>>> GetUsuarios()
        {
            try
            {
                var usuarios = await _usuarioService.GetUsuarios();
                return Ok(usuarios);
            }
            catch
            {
                return BadRequest("Request Invalido");
            }
        }

        [HttpGet("UsuariosPorNome")]
        public async Task<ActionResult<IAsyncEnumerable<Usuario>>> GetUsuariosByName([FromQuery] string nome)
        {
            try
            {
                var usuarios = await _usuarioService.GetUsuariosByName(nome);
                if (usuarios == null)
                    return NotFound($"Não existem usuarios com o criterio {nome}");

                return Ok(usuarios);
            }
            catch
            {
                return BadRequest("Request Invalido");
            }
        }
        [HttpGet("{id}", Name="GetUsuario")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            try
            {
                var usuario = await _usuarioService.GetUsuario(id);
                if (usuario == null)
                    return NotFound($"Não existem usuario com o id = {id}");
                return Ok(usuario);
            }
            catch
            {
                return BadRequest("Request Invalido");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Usuario usuario)
        {
            try
            {
                await _usuarioService.CreateUsuario(usuario);
                return CreatedAtRoute(nameof(GetUsuario), new { id = usuario.Id }, usuario);
            }
            catch
            {
                return BadRequest("Request Invalido");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(int id, [FromBody] Usuario usuario)
        {
            try
            {
                if(usuario.Id == id)
                {
                    await _usuarioService.UpdateUsuario(usuario);
                    return Ok($"Usuario com ID = {usuario.Id} atualizado com sucesso");
                }
                else
                {
                    return BadRequest("Dados inconsistentes");
                }
            }
            catch
            {
                return BadRequest("Request Invalido");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var usuario = await _usuarioService.GetUsuario(id);
                if(usuario != null)
                {
                    await _usuarioService.DeleteUsuario(usuario);
                    return Ok($"Usuário de id  = {id} foi exluido com sucesso");
                }
                else
                {
                    return NotFound($"Usuário com id = {id} não foi encontrado");
                }
            }
            catch
            {
                return BadRequest("Request Invalido");
            }
        }
    }
}

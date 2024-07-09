using CrudApi.Models;

namespace CrudApi.Services;

public interface IUsuarioService
{
    Task<IEnumerable<Usuario>> GetUsuarios();
    Task<Usuario> GetUsuario(int id);
    Task<IEnumerable<Usuario>> GetUsuariosByName(string nome);
    Task CreateUsuario(Usuario usuario);
    Task UpdateUsuario(Usuario usuario);
    Task DeleteUsuario(Usuario usuario);
}

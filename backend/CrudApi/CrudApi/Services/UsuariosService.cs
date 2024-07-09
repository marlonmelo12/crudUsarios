using CrudApi.Context;
using CrudApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudApi.Services;

public class UsuariosService : IUsuarioService
{
    private readonly AppDbContext _context;

    public UsuariosService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Usuario>> GetUsuarios()
    {
        try
        {
            return await _context.Usuarios.ToListAsync();
        }
        catch
        {
            throw;
        }
        
    }
    
    public async Task<IEnumerable<Usuario>> GetUsuariosByName(string nome)
    {
        IEnumerable<Usuario> usuarios;
        if(!string.IsNullOrWhiteSpace(nome))
        {
            usuarios = await _context.Usuarios.Where(n => n.Nome.Contains(nome)).ToListAsync();
        }
        else
        {
            usuarios = await GetUsuarios();
        }
        return usuarios;
    }
    
    public async Task<Usuario> GetUsuario(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        return usuario;
    }
    public async Task CreateUsuario(Usuario usuario)
    {
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();
    }
    public async Task UpdateUsuario(Usuario usuario)
    {
        _context.Entry(usuario).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUsuario(Usuario usuario)
    {
        _context.Usuarios.Remove(usuario);
        await _context.SaveChangesAsync();
    } 
}

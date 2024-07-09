using CrudApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudApi.Context;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Usuario> Usuarios { get; set; }
}

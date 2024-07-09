using System.ComponentModel.DataAnnotations;

namespace CrudApi.Models;

public class Usuario
{
    public int Id { get; set; }

    [Required]
    [StringLength(80)]
    public string? Nome { get; set; }
    [Required]
    [EmailAddress]
    [StringLength(100)]
    public string? Email { get; set; }

    [Required]
    [StringLength(15)]
    public string? Telefone { get; set; }
}

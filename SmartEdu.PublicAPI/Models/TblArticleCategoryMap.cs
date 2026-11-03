using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEdu.PublicAPI.Models;

[Table("tbl_ArticleCategoryMap", Schema = "public")]
public class TblArticleCategoryMap
{
    [Key]
    [Column("Id")]
    public int Id { get; set; }

    [Column("ArticleId")]
    public int ArticleId { get; set; }

    [Column("CategoryId")]
    public int CategoryId { get; set; }
}


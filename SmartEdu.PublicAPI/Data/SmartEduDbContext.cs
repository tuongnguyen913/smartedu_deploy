using Microsoft.EntityFrameworkCore;
using SmartEdu.PublicAPI.Models;

namespace SmartEdu.PublicAPI.Data;

public class SmartEduDbContext : DbContext
{
    public SmartEduDbContext(DbContextOptions<SmartEduDbContext> options) : base(options)
    {
    }

    public DbSet<TblModuleArticle> TblModuleArticles => Set<TblModuleArticle>();
    public DbSet<Teacher> Teachers => Set<Teacher>();
    public DbSet<Branch> Branches => Set<Branch>();
    public DbSet<ContactInfo> ContactInfos => Set<ContactInfo>();
    public DbSet<TblFooterConfig> TblFooterConfigs => Set<TblFooterConfig>();
    public DbSet<TblHomepageSection> TblHomepageSections => Set<TblHomepageSection>();
    public DbSet<CategoryArticle> CategoryArticles => Set<CategoryArticle>();
    public DbSet<TblArticleLv1> TblArticleLv1s => Set<TblArticleLv1>();
    public DbSet<TblArticleCategoryMap> TblArticleCategoryMaps => Set<TblArticleCategoryMap>();
    public DbSet<Course> Courses => Set<Course>();
    public DbSet<CourseSyllabus> CourseSyllabuses => Set<CourseSyllabus>();
    public DbSet<Album> Albums => Set<Album>();
    public DbSet<Media> Medias => Set<Media>();
    public DbSet<Enrollment> Enrollments => Set<Enrollment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TblModuleArticle>(entity =>
        {
            entity.ToTable("tbl_ModuleArticle", "public");
            entity.HasKey(e => e.ModuleId);
        });

        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.ToTable("Teachers", "public");
            entity.HasKey(e => e.TeacherId);
        });

        modelBuilder.Entity<Branch>(entity =>
        {
            entity.ToTable("Branches", "public");
            entity.HasKey(e => e.BranchId);
        });

        modelBuilder.Entity<ContactInfo>(entity =>
        {
            entity.ToTable("ContactInfo", "public");
            entity.HasKey(e => e.Id);
        });

        modelBuilder.Entity<TblFooterConfig>(entity =>
        {
            entity.ToTable("tbl_FooterConfig", "public");
            entity.HasKey(e => e.Id);
        });

        modelBuilder.Entity<TblHomepageSection>(entity =>
        {
            entity.ToTable("tbl_HomepageSection", "public");
            entity.HasKey(e => e.Id);
        });

        modelBuilder.Entity<CategoryArticle>(entity =>
        {
            entity.ToTable("CategoryArticle", "public");
            entity.HasKey(e => e.CategoryId);
        });

        modelBuilder.Entity<TblArticleLv1>(entity =>
        {
            entity.ToTable("tbl_ArticleLV1", "public");
            entity.HasKey(e => e.ArticleId);
        });

        modelBuilder.Entity<TblArticleCategoryMap>(entity =>
        {
            entity.ToTable("tbl_ArticleCategoryMap", "public");
            entity.HasKey(e => e.Id);
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.ToTable("Courses", "public");
            entity.HasKey(e => e.CourseId);
        });

        modelBuilder.Entity<CourseSyllabus>(entity =>
        {
            entity.ToTable("CourseSyllabus", "public");
            entity.HasKey(e => e.SyllabusId);
        });

        modelBuilder.Entity<Album>(entity =>
        {
            entity.ToTable("Albums", "public");
            entity.HasKey(e => e.Id);
        });

        modelBuilder.Entity<Media>(entity =>
        {
            entity.ToTable("Medias", "public");
            entity.HasKey(e => e.Id);
        });

        modelBuilder.Entity<Enrollment>(entity =>
        {
            entity.ToTable("Enrollments", "public");
            entity.HasKey(e => e.EnrollmentId);
            entity.Property(e => e.EnrollmentId).ValueGeneratedOnAdd();
        });
    }
}

namespace SmartEdu.PublicAPI.DTOs;

public class CourseCategoryTabDto
{
    public int ModuleId { get; set; }
    public string ModuleName { get; set; } = string.Empty;
    public string ModuleKey { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}

public class CourseListItemDto
{
    public int CourseId { get; set; }
    public string CourseName { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string GradeLevel { get; set; } = string.Empty;
    public string? Grade { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string? ThumbnailUrl { get; set; }
    public decimal? TuitionFee { get; set; }
    public string? TuitionPeriod { get; set; }
    public string? ScheduleSummary { get; set; }
    public int? ClassSizeMax { get; set; }
    public bool? HasFreeTutoringGuarantee { get; set; }
    public bool? HasTuitionRefundGuarantee { get; set; }
    public int? DisplayOrder { get; set; }
    public bool? IsFeatured { get; set; }
    public bool? IsActive { get; set; }
}

public class CoursesResponseDto
{
    public List<CourseCategoryTabDto> Categories { get; set; } = new();
    public List<CourseListItemDto> Courses { get; set; } = new();
}

public class CourseSyllabusDto
{
    public int SyllabusId { get; set; }
    public int CourseId { get; set; }
    public string SemesterName { get; set; } = string.Empty;
    public string TopicTitle { get; set; } = string.Empty;
    public string? TopicContent { get; set; }
    public int DisplayOrder { get; set; }
}

public class CourseDetailDto
{
    public int CourseId { get; set; }
    public string CourseName { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string GradeLevel { get; set; } = string.Empty;
    public string? Grade { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string? ContentHtml { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? BannerUrl { get; set; }
    public string? HeroBanner { get => BannerUrl; set => BannerUrl = value; }
    public string? PsychologyOverview { get; set; }
    public string? TargetKnowledge { get; set; }
    public string? TargetThinking { get; set; }
    public string? TargetSkills { get; set; }
    public decimal? TuitionFee { get; set; }
    public string? TuitionPeriod { get; set; }
    public string? ScheduleSummary { get; set; }
    public int? ClassSizeMax { get; set; }
    public bool? HasFreeTutoringGuarantee { get; set; }
    public bool? HasTuitionRefundGuarantee { get; set; }
    public string? SeoTitle { get; set; }
    public string? SeoDescription { get; set; }
    public string? SeoKeywords { get; set; }
    public List<CourseSyllabusDto> Syllabuses { get; set; } = new();
    public List<CourseSyllabusDto> SyllabusList { get => Syllabuses; set => Syllabuses = value; }
}


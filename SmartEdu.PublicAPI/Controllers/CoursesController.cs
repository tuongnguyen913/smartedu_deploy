using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartEdu.PublicAPI.Data;
using SmartEdu.PublicAPI.DTOs;
using SmartEdu.PublicAPI.Models;

namespace SmartEdu.PublicAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowAngular")]
public class CoursesController : ControllerBase
{
    private readonly SmartEduDbContext _context;
    private readonly ILogger<CoursesController> _logger;

    public CoursesController(SmartEduDbContext context, ILogger<CoursesController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// GET /api/courses/header
    /// Truy vấn bảng tbl_HomepageSection theo SectionCode = 'COURSE_HEADER'
    /// </summary>
    [HttpGet("header")]
    public async Task<ActionResult<PageHeaderDto>> GetHeader()
    {
        try
        {
            var section = await _context.TblHomepageSections
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.SectionCode == "COURSE_HEADER");

            if (section != null)
            {
                return Ok(new PageHeaderDto
                {
                    SubTitle = !string.IsNullOrWhiteSpace(section.SubTitle)
                        ? section.SubTitle
                        : "LỘ TRÌNH CÁ NHÂN HÓA",
                    Title = !string.IsNullOrWhiteSpace(section.Title)
                        ? section.Title
                        : "Chương Trình Bồi Dưỡng Chất Lượng Cao",
                    Content = !string.IsNullOrWhiteSpace(section.Content)
                        ? section.Content
                        : "Hệ thống chương trình chuẩn mực từ Lớp 6 đến Lớp 12 và Luyện thi Tuyển sinh 10. 100% giáo viên ĐH Sư Phạm TP.HCM giảng dạy, kèm 1:1 miễn phí ngoài giờ.",
                    IsActive = section.IsActive ?? true
                });
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query tbl_HomepageSection for COURSE_HEADER.");
        }

        return Ok(new PageHeaderDto
        {
            SubTitle = "LỘ TRÌNH CÁ NHÂN HÓA",
            Title = "Chương Trình Bồi Dưỡng Chất Lượng Cao",
            Content = "Hệ thống chương trình chuẩn mực từ Lớp 6 đến Lớp 12 và Luyện thi Tuyển sinh 10. 100% giáo viên ĐH Sư Phạm TP.HCM giảng dạy, kèm 1:1 miễn phí ngoài giờ.",
            IsActive = true
        });
    }

    /// <summary>
    /// GET /api/courses/list
    /// Load danh sách Tab từ tbl_ModuleArticle (thuộc Chương trình học, đã bỏ thẻ ĐGNL & Đại học),
    /// danh sách Khóa học trực tiếp từ bảng Courses trong DB
    /// </summary>
    [HttpGet("list")]
    public async Task<ActionResult<CoursesResponseDto>> GetCoursesList()
    {
        var response = new CoursesResponseDto();

        try
        {
            // Tìm module "Chương trình học" (ModuleId = 3 hoặc ModuleKey = "chuong-trinh-hoc")
            var rootCourseModule = await _context.TblModuleArticles
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.ModuleId == 3 || m.ModuleKey == "chuong-trinh-hoc");

            int parentId = rootCourseModule?.ModuleId ?? 3;

            var childModules = await _context.TblModuleArticles
                .AsNoTracking()
                .Where(m => m.ParentId == parentId && (m.IsActive ?? true))
                .OrderBy(m => m.DisplayOrder ?? 0)
                .ThenBy(m => m.ModuleId)
                .ToListAsync();

            // Lọc bỏ tab "Đại học & ĐGNL"
            var filteredModules = childModules.Where(m =>
                !m.ModuleName.Contains("ĐGNL", StringComparison.OrdinalIgnoreCase) &&
                !m.ModuleName.Contains("Đại học", StringComparison.OrdinalIgnoreCase) &&
                !m.ModuleKey.Contains("daihoc", StringComparison.OrdinalIgnoreCase) &&
                !m.ModuleKey.Contains("dgnl", StringComparison.OrdinalIgnoreCase)
            ).ToList();

            var categoryTabs = new List<CourseCategoryTabDto>
            {
                new() { ModuleId = 0, ModuleName = "Tất cả chương trình", ModuleKey = "ALL", DisplayOrder = 0 },
                new() { ModuleId = 1, ModuleName = "KHỐI THCS (LỚP 6 - 9)", ModuleKey = "Cap2", DisplayOrder = 1 },
                new() { ModuleId = 2, ModuleName = "KHỐI TUYỂN SINH 10 & CHUYÊN", ModuleKey = "ChuyenCap", DisplayOrder = 2 },
                new() { ModuleId = 3, ModuleName = "KHỐI THPT & LUYỆN THI ĐẠI HỌC", ModuleKey = "Cap3", DisplayOrder = 3 }
            };

            // Truy vấn trực tiếp từ bảng Courses trong DB
            var dbCourses = await _context.Courses
                .AsNoTracking()
                .Where(c => (c.IsActive ?? true) &&
                            c.GradeLevel != "daihoc" &&
                            !c.CourseName.Contains("ĐGNL") &&
                            !c.Subject.Contains("ĐGNL"))
                .OrderBy(c => c.DisplayOrder ?? 0)
                .ThenBy(c => c.CourseId)
                .ToListAsync();

            var courseList = dbCourses.Select(c => new CourseListItemDto
            {
                CourseId = c.CourseId,
                CourseName = c.CourseName,
                Slug = c.Slug,
                GradeLevel = c.GradeLevel,
                Grade = c.Grade,
                Subject = c.Subject,
                ShortDescription = c.ShortDescription,
                ThumbnailUrl = c.ThumbnailUrl,
                TuitionFee = c.TuitionFee,
                TuitionPeriod = c.TuitionPeriod,
                ScheduleSummary = c.ScheduleSummary,
                ClassSizeMax = c.ClassSizeMax,
                HasFreeTutoringGuarantee = c.HasFreeTutoringGuarantee,
                HasTuitionRefundGuarantee = c.HasTuitionRefundGuarantee,
                DisplayOrder = c.DisplayOrder,
                IsFeatured = c.IsFeatured,
                IsActive = c.IsActive
            }).ToList();

            // Render trực tiếp từ DB
            response.Categories = categoryTabs;
            response.Courses = courseList;
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query Courses or tbl_ModuleArticle from PostgreSQL.");
        }

        // Trường hợp lỗi kết nối DB, trả về danh sách an toàn không bị 500
        response.Categories = new List<CourseCategoryTabDto>
        {
            new() { ModuleId = 0, ModuleName = "Tất cả chương trình", ModuleKey = "all", DisplayOrder = 0 },
            new() { ModuleId = 31, ModuleName = "Khối THCS (Lớp 6 - 9)", ModuleKey = "cap2", DisplayOrder = 1 },
            new() { ModuleId = 32, ModuleName = "Luyện thi Tuyển sinh 10", ModuleKey = "tuyensinh10", DisplayOrder = 2 },
            new() { ModuleId = 33, ModuleName = "Khối THPT (Lớp 10 - 12)", ModuleKey = "cap3", DisplayOrder = 3 }
        };
        response.Courses = new List<CourseListItemDto>();
        return Ok(response);
    }

    /// <summary>
    /// GET /api/courses
    /// Alias trả về danh sách khóa học
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<CourseListItemDto>>> GetAllCourses()
    {
        var result = await GetCoursesList();
        if (result.Result is OkObjectResult ok && ok.Value is CoursesResponseDto res)
        {
            return Ok(res.Courses);
        }
        return Ok(new List<CourseListItemDto>());
    }

    /// <summary>
    /// GET /api/courses/detail/{slug}
    /// Truy vấn chi tiết khóa học theo Slug cùng danh sách CourseSyllabus
    /// </summary>
    [HttpGet("detail/{slug}")]
    public async Task<ActionResult<CourseDetailDto>> GetCourseDetail(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return BadRequest(new { message = "Slug khóa học không được để trống." });
        }

        try
        {
            var cleanSlug = slug.Trim();
            int.TryParse(cleanSlug, out int parsedId);

            // 1. Query bảng Courses theo Slug hoặc CourseId
            var course = await _context.Courses
                .AsNoTracking()
                .FirstOrDefaultAsync(c =>
                    (c.Slug != null && c.Slug.ToLower() == cleanSlug.ToLower()) ||
                    (parsedId > 0 && c.CourseId == parsedId));

            if (course == null || !(course.IsActive ?? true))
            {
                return NotFound(new { message = "Không tìm thấy khóa học yêu cầu." });
            }

            // 2. Query kèm bảng CourseSyllabus theo CourseId (ORDER BY DisplayOrder)
            var syllabuses = await _context.CourseSyllabuses
                .AsNoTracking()
                .Where(s => s.CourseId == course.CourseId)
                .OrderBy(s => s.DisplayOrder ?? 0)
                .ThenBy(s => s.SyllabusId)
                .Select(s => new CourseSyllabusDto
                {
                    SyllabusId = s.SyllabusId,
                    CourseId = s.CourseId,
                    SemesterName = s.SemesterName,
                    TopicTitle = s.TopicTitle,
                    TopicContent = s.TopicContent,
                    DisplayOrder = s.DisplayOrder ?? 0
                })
                .ToListAsync();

            var dto = new CourseDetailDto
            {
                CourseId = course.CourseId,
                CourseName = course.CourseName,
                Slug = course.Slug,
                GradeLevel = course.GradeLevel,
                Grade = course.Grade,
                Subject = course.Subject,
                ShortDescription = course.ShortDescription,
                ContentHtml = course.ContentHtml,
                ThumbnailUrl = course.ThumbnailUrl,
                BannerUrl = course.BannerUrl,
                PsychologyOverview = course.PsychologyOverview,
                TargetKnowledge = course.TargetKnowledge,
                TargetThinking = course.TargetThinking,
                TargetSkills = course.TargetSkills,
                TuitionFee = course.TuitionFee,
                TuitionPeriod = course.TuitionPeriod,
                ScheduleSummary = course.ScheduleSummary,
                ClassSizeMax = course.ClassSizeMax,
                HasFreeTutoringGuarantee = course.HasFreeTutoringGuarantee,
                HasTuitionRefundGuarantee = course.HasTuitionRefundGuarantee,
                SeoTitle = !string.IsNullOrWhiteSpace(course.SeoTitle) ? course.SeoTitle : course.CourseName,
                SeoDescription = !string.IsNullOrWhiteSpace(course.SeoDescription) ? course.SeoDescription : course.ShortDescription,
                SeoKeywords = course.SeoKeywords,
                Syllabuses = syllabuses
            };

            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi xảy ra khi truy vấn chi tiết khóa học: {Slug}", slug);
            return StatusCode(500, new { message = "Lỗi máy chủ khi lấy chi tiết khóa học." });
        }
    }
}

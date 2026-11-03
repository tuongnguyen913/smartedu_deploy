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
                ThumbnailUrl = !string.IsNullOrWhiteSpace(c.ThumbnailUrl) ? c.ThumbnailUrl : (c.GradeLevel == "ChuyenCap" ? "assets/images/lop-cap3.png" : "assets/images/lop-cap2.png"),
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

            // Đảm bảo khối THPT (Cap3) luôn có mặt trong danh sách (kể cả khi DB PostgreSQL chưa nạp dòng Cap3)
            if (!courseList.Any(c => c.GradeLevel != null && c.GradeLevel.Equals("Cap3", StringComparison.OrdinalIgnoreCase)))
            {
                courseList.Add(new CourseListItemDto
                {
                    CourseId = 4,
                    CourseName = "Khối THPT & Luyện Thi Đại Học (Lớp 10 – 12)",
                    Slug = "khoi-thpt-dinh-huong-dai-hoc",
                    GradeLevel = "Cap3",
                    Grade = "Lớp 10 - Lớp 12",
                    Subject = "Toán, Vật Lý, Hóa Học, Ngữ Văn, Tiếng Anh",
                    ShortDescription = "Nắm chắc kiến thức phân hóa nâng cao, bám sát phương pháp đổi mới của Bộ GD&ĐT, chuẩn bị hồ sơ xét tuyển.",
                    ThumbnailUrl = "assets/images/anh-ai-ung-dung.jpg",
                    TuitionFee = 2500000,
                    TuitionPeriod = "/tháng",
                    ScheduleSummary = "3 buổi / tuần",
                    ClassSizeMax = 15,
                    HasFreeTutoringGuarantee = true,
                    HasTuitionRefundGuarantee = true,
                    DisplayOrder = 4,
                    IsFeatured = true,
                    IsActive = true
                });
            }

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
                // Fallback cho khóa THPT nếu DB chưa có dòng Cap3
                if (cleanSlug.Contains("thpt", StringComparison.OrdinalIgnoreCase) ||
                    cleanSlug.Contains("cap3", StringComparison.OrdinalIgnoreCase) ||
                    parsedId == 4)
                {
                    return Ok(new CourseDetailDto
                    {
                        CourseId = 4,
                        CourseName = "Khối THPT & Luyện Thi Đại Học (Lớp 10 – 12)",
                        Slug = "khoi-thpt-dinh-huong-dai-hoc",
                        GradeLevel = "Cap3",
                        Grade = "Lớp 10 - Lớp 12",
                        Subject = "Toán, Vật Lý, Hóa Học, Ngữ Văn, Tiếng Anh",
                        ShortDescription = "Nắm chắc kiến thức phân hóa nâng cao, bám sát phương pháp đổi mới của Bộ GD&ĐT, chuẩn bị hồ sơ xét tuyển.",
                        ThumbnailUrl = "assets/images/anh-ai-ung-dung.jpg",
                        BannerUrl = "assets/images/anh-ai-ung-dung.jpg",
                        TuitionFee = 2500000,
                        TuitionPeriod = "/tháng",
                        ScheduleSummary = "3 buổi / tuần",
                        ClassSizeMax = 15,
                        HasFreeTutoringGuarantee = true,
                        HasTuitionRefundGuarantee = true,
                        ContentHtml = @"
                            <h2>1. Giới thiệu tổng quan chương trình THPT</h2>
                            <p>Chương trình Khối THPT & Luyện Thi Đại Học tại SmartEdu Academy được thiết kế đặc thù cho giai đoạn then chốt Lớp 10 - 12. Nội dung bám sát ma trận đề thi Tốt nghiệp THPT và kỳ thi ĐGNL ĐHQG TP.HCM.</p>
                            <h2>2. Mục tiêu năng lực đầu ra</h2>
                            <ul>
                                <li><strong>Chuyên đề phân hóa:</strong> Quét sạch các dạng bài vận dụng cao chiếm 20-30% đề thi chính thức.</li>
                                <li><strong>Kỹ năng bấm máy & tư duy nhanh:</strong> Tối ưu hóa thời gian làm bài thi trắc nghiệm khách quan.</li>
                                <li><strong>Chiến thuật phòng thi:</strong> Định vị chính xác mục tiêu tổ hợp xét tuyển đại học NV1.</li>
                            </ul>
                            <h2>3. Cam kết đồng hành</h2>
                            <p>Được học trực tiếp cùng các Thầy Cô giàu kinh nghiệm bồi dưỡng học sinh giỏi từ ĐH Sư Phạm TP.HCM, kèm 1:1 miễn phí ngoài giờ khi gặp chuyên đề khó.</p>",
                        Syllabuses = new List<CourseSyllabusDto>
                        {
                            new() { SyllabusId = 401, CourseId = 4, SemesterName = "Giai đoạn 1: Nền Tảng Chuyên Sâu", TopicTitle = "Chuyên Đề Nâng Cao & Phân Hóa Lớp 10-11", TopicContent = "Củng cố các mảng kiến thức khó, kỹ năng bấm máy tính Casio và tư duy liên môn.", DisplayOrder = 1 },
                            new() { SyllabusId = 402, CourseId = 4, SemesterName = "Giai đoạn 2: Tăng Tốc Lớp 12", TopicTitle = "Quét Kiến Thức Trọng Tâm Lớp 12 GDPT Mới", TopicContent = "Đi sâu vào các dạng bài liên hệ thực tiễn và câu hỏi bẫy thường gặp trong đề thi chuẩn Bộ.", DisplayOrder = 2 },
                            new() { SyllabusId = 403, CourseId = 4, SemesterName = "Giai đoạn 3: Thực Chiến & Về Đích", TopicTitle = "Luyện Đề Chuẩn Ma Trận & Thi Thử Định Kỳ", TopicContent = "Luyện bộ đề độc quyền, rèn tâm lý thi cử vững vàng, tối ưu barem điểm từng phân môn.", DisplayOrder = 3 }
                        }
                    });
                }

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

            // Nếu DB chưa có Syllabus cho khóa này, tự động sinh lộ trình riêng theo môn học
            if (syllabuses.Count == 0)
            {
                if (course.CourseId == 2 || course.Subject.Contains("Khoa học", StringComparison.OrdinalIgnoreCase))
                {
                    syllabuses = new List<CourseSyllabusDto>
                    {
                        new() { SyllabusId = 201, CourseId = course.CourseId, SemesterName = "Giai đoạn 1: Khám Phá Hiện Tượng", TopicTitle = "Hệ Thống Hóa Bản Chất Vật Lý - Hóa Học - Sinh Học", TopicContent = "Tiếp cận môn KHTN qua sơ đồ tư duy trực quan, xóa bỏ phương pháp học vẹt công thức.", DisplayOrder = 1 },
                        new() { SyllabusId = 202, CourseId = course.CourseId, SemesterName = "Giai đoạn 2: Tích Hợp Liên Môn", TopicTitle = "Kỹ Năng Phân Tích Biểu Đồ & Bài Toán Thực Tế", TopicContent = "Rèn luyện đọc hiểu số liệu thí nghiệm, phân tích nguyên nhân - kết quả trong các hiện tượng đời sống.", DisplayOrder = 2 },
                        new() { SyllabusId = 203, CourseId = course.CourseId, SemesterName = "Giai đoạn 3: Bứt Phá Điểm 9-10", TopicTitle = "Luyện Đề Kiểm Tra Định Kỳ & Học Kỳ Chuẩn Sở", TopicContent = "Giải các bộ đề thi học kỳ chọn lọc, khắc phục lỗi diễn đạt và trình bày chuẩn barem điểm.", DisplayOrder = 3 }
                    };
                }
                else if (course.CourseId == 3 || course.GradeLevel == "ChuyenCap")
                {
                    syllabuses = new List<CourseSyllabusDto>
                    {
                        new() { SyllabusId = 301, CourseId = course.CourseId, SemesterName = "Giai đoạn 1: Quét Sạch Lỗ Hổng", TopicTitle = "12 Dạng Toán Thực Tế Kinh Điển Trong Đề Thi Vào 10", TopicContent = "Chuyên đề lãi suất, hình học không gian thực tế, hàm số bậc nhất và bài toán năng suất.", DisplayOrder = 1 },
                        new() { SyllabusId = 302, CourseId = course.CourseId, SemesterName = "Giai đoạn 2: Chinh Phục Điểm 8-9", TopicTitle = "Tứ Giác Nội Tiếp & Bất Đẳng Thức Phân Hóa", TopicContent = "Rèn phương pháp vẽ đường phụ hình học và tư duy giải quyết câu hỏi phân loại học sinh giỏi.", DisplayOrder = 2 },
                        new() { SyllabusId = 303, CourseId = course.CourseId, SemesterName = "Giai đoạn 3: Vượt Vũ Môn", TopicTitle = "Thi Thử Nghiêm Ngặt & Rèn Luyện Tâm Lý Phòng Thi", TopicContent = "Mô phỏng 100% điều kiện phòng thi Sở GD&ĐT TP.HCM, rọc phách chấm chéo và chỉ ra lỗi trừ điểm vặt.", DisplayOrder = 3 }
                    };
                }
            }

            // Tạo ContentHtml phong phú riêng biệt theo từng khóa học nếu trong DB để trống
            var generatedContentHtml = !string.IsNullOrWhiteSpace(course.ContentHtml)
                ? course.ContentHtml
                : $@"
                    <h2>1. Giới thiệu tổng quan: {course.CourseName}</h2>
                    <p>{course.ShortDescription}</p>
                    {(!string.IsNullOrWhiteSpace(course.PsychologyOverview) ? $"<h3>Thực trạng & Tâm lý học sinh</h3><p>{course.PsychologyOverview}</p>" : "")}
                    <h2>2. Chuẩn đầu ra & Mục tiêu đào tạo</h2>
                    <ul>
                        {(!string.IsNullOrWhiteSpace(course.TargetKnowledge) ? $"<li><strong>Kiến thức:</strong> {course.TargetKnowledge}</li>" : "<li><strong>Kiến thức cốt lõi:</strong> Nắm vững 100% định nghĩa, định lý và công thức trọng tâm.</li>")}
                        {(!string.IsNullOrWhiteSpace(course.TargetThinking) ? $"<li><strong>Tư duy logic:</strong> {course.TargetThinking}</li>" : "<li><strong>Tư duy phản biện:</strong> Rèn luyện kỹ năng phân tích đề bài mạch lạc, không học vẹt.</li>")}
                        {(!string.IsNullOrWhiteSpace(course.TargetSkills) ? $"<li><strong>Kỹ năng phòng thi:</strong> {course.TargetSkills}</li>" : "<li><strong>Kỹ năng làm bài:</strong> Phân bổ thời gian thi hợp lý và trình bày chuẩn barem điểm.</li>")}
                    </ul>
                    <h2>3. Quyền lợi học sinh tại SmartEdu Academy</h2>
                    <p>Sĩ số tối đa <strong>{course.ClassSizeMax ?? 15} học sinh/lớp</strong> giúp giáo viên ĐH Sư Phạm TP.HCM theo sát từng em. Học sinh được <strong>phụ đạo 1:1 miễn phí ngoài giờ</strong> và cam kết hoàn 100% học phí nếu không tiến bộ.</p>";

            var dto = new CourseDetailDto
            {
                CourseId = course.CourseId,
                CourseName = course.CourseName,
                Slug = course.Slug,
                GradeLevel = course.GradeLevel,
                Grade = course.Grade,
                Subject = course.Subject,
                ShortDescription = course.ShortDescription,
                ContentHtml = generatedContentHtml,
                ThumbnailUrl = !string.IsNullOrWhiteSpace(course.ThumbnailUrl) ? course.ThumbnailUrl : (course.GradeLevel == "ChuyenCap" ? "assets/images/lop-cap3.png" : "assets/images/lop-cap2.png"),
                BannerUrl = course.BannerUrl,
                HeroBanner = course.BannerUrl,
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
                Syllabuses = syllabuses,
                SyllabusList = syllabuses
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

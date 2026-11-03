using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartEdu.PublicAPI.Data;
using SmartEdu.PublicAPI.Models;

namespace SmartEdu.PublicAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeachersController : ControllerBase
{
    private readonly SmartEduDbContext _context;
    private readonly ILogger<TeachersController> _logger;

    public TeachersController(SmartEduDbContext context, ILogger<TeachersController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// GET /api/teachers
    /// Trả về danh sách giáo viên thỏa điều kiện IsActive = true sắp xếp theo DisplayOrder
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<Teacher>>> GetTeachers([FromQuery] bool? featured = null)
    {
        List<Teacher> teachers;

        try
        {
            var query = _context.Teachers
                .AsNoTracking()
                .Where(t => t.IsActive ?? true);

            if (featured.HasValue && featured.Value)
            {
                query = query.Where(t => t.IsFeatured ?? false);
            }

            teachers = await query
                .OrderBy(t => t.DisplayOrder ?? 0)
                .ThenBy(t => t.TeacherId)
                .ToListAsync();

            if (teachers.Count == 0)
            {
                _logger.LogInformation("Teachers table is empty. Returning default seed teachers from DB dump.");
                teachers = GetDefaultSeedTeachers();
                if (featured.HasValue && featured.Value)
                {
                    teachers = teachers.Where(t => t.IsFeatured ?? false).ToList();
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query PostgreSQL table Teachers. Returning fallback teacher data.");
            teachers = GetDefaultSeedTeachers();
            if (featured.HasValue && featured.Value)
            {
                teachers = teachers.Where(t => t.IsFeatured ?? false).ToList();
            }
        }

        return Ok(teachers);
    }

    /// <summary>
    /// GET /api/teachers/{id}
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Teacher>> GetTeacherById(int id)
    {
        try
        {
            var teacher = await _context.Teachers.AsNoTracking().FirstOrDefaultAsync(t => t.TeacherId == id);
            if (teacher != null)
            {
                return Ok(teacher);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Error getting teacher {Id} from DB. Using fallback.", id);
        }

        var fallback = GetDefaultSeedTeachers().FirstOrDefault(t => t.TeacherId == id);
        if (fallback != null)
        {
            return Ok(fallback);
        }

        return NotFound();
    }

    /// <summary>
    /// Dữ liệu mẫu chuẩn từ file smartedudb.sql (4 Thầy/Cô cốt cán)
    /// </summary>
    private static List<Teacher> GetDefaultSeedTeachers()
    {
        return new List<Teacher>
        {
            new Teacher
            {
                TeacherId = 1,
                FullName = "Thầy Nguyễn Văn Tuấn",
                Slug = "thay-nguyen-van-tuan",
                AcademicDegree = "Thạc sĩ Toán học",
                GraduatedUniversity = "Đại học Sư phạm TP.HCM",
                Position = "Trưởng bộ môn Toán & Luyện thi",
                Subject = "Toán học",
                GradeLevels = "Cấp 2, Cấp 3",
                ExperienceYears = 15,
                TeachingPhilosophy = "Toán học không phải là học thuộc công thức, mà là chìa khóa mở rộng tư duy giải quyết vấn đề trong cuộc sống.",
                BioTimelineJson = "[{\"year\":\"2009-2013\",\"event\":\"Tốt nghiệp Thủ khoa Sư phạm Toán - ĐH Sư phạm TP.HCM\"},{\"year\":\"2013-2016\",\"event\":\"Thạc sĩ Phương pháp Giảng dạy Toán học\"},{\"year\":\"2016-nay\",\"event\":\"Đồng hành đào tạo hơn 2,500 học sinh đỗ trường THPT Top đầu TP.HCM\"}]",
                AvatarUrl = "assets/images/teachers/teacher-1.jpg",
                DisplayOrder = 1,
                IsFeatured = true,
                IsActive = true,
                SeoTitle = "Thầy Nguyễn Văn Tuấn - Thạc sĩ Toán học ĐH Sư phạm TP.HCM"
            },
            new Teacher
            {
                TeacherId = 2,
                FullName = "Cô Trần Thị Mai Chi",
                Slug = "co-tran-thi-mai-chi",
                AcademicDegree = "Thạc sĩ Hóa học",
                GraduatedUniversity = "Đại học Sư phạm TP.HCM",
                Position = "Chuyên gia Khoa học Tự nhiên",
                Subject = "Khoa học Tự nhiên",
                GradeLevels = "Cấp 2, Cấp 3",
                ExperienceYears = 12,
                TeachingPhilosophy = "Mỗi thí nghiệm là một câu chuyện kỳ diệu. Học KHTN là chạm vào bản chất của thế giới xung quanh.",
                BioTimelineJson = "[{\"year\":\"2012-2016\",\"event\":\"Cử nhân Sư phạm Hóa học xuất sắc - ĐH Sư phạm TP.HCM\"},{\"year\":\"2016-2019\",\"event\":\"Thạc sĩ Hóa học lý thuyết & ứng dụng\"},{\"year\":\"2019-nay\",\"event\":\"Chủ nhiệm bồi dưỡng học sinh giỏi KHTN Quận 6\"}]",
                AvatarUrl = "assets/images/teachers/teacher-2.jpg",
                DisplayOrder = 2,
                IsFeatured = true,
                IsActive = true,
                SeoTitle = "Cô Trần Thị Mai Chi - Thạc sĩ KHTN ĐH Sư phạm TP.HCM"
            },
            new Teacher
            {
                TeacherId = 3,
                FullName = "Thầy Lê Hoàng Nam",
                Slug = "thay-le-hoang-nam",
                AcademicDegree = "Cử nhân Vật Lý Xuất Sắc",
                GraduatedUniversity = "Đại học Khoa học Tự nhiên TP.HCM",
                Position = "Giảng viên Chuyên sâu Vật Lý",
                Subject = "Vật Lý",
                GradeLevels = "Cấp 2, Cấp 3",
                ExperienceYears = 10,
                TeachingPhilosophy = "Biến định luật khô khan thành hiện tượng trực quan sinh động, giúp học sinh yêu thích và ghi nhớ bền vững.",
                BioTimelineJson = "[{\"year\":\"2014-2018\",\"event\":\"Tốt nghiệp ĐH Khoa học Tự nhiên TP.HCM\"},{\"year\":\"2018-nay\",\"event\":\"Tác giả bộ chuyên đề Lấy lại gốc và Đột phá điểm 9+ môn Vật Lý THPT\"}]",
                AvatarUrl = "assets/images/teachers/teacher-3.jpg",
                DisplayOrder = 3,
                IsFeatured = true,
                IsActive = true,
                SeoTitle = "Thầy Lê Hoàng Nam - Giảng viên Vật Lý ĐH KHTN"
            },
            new Teacher
            {
                TeacherId = 4,
                FullName = "Cô Phạm Thu Hà",
                Slug = "co-pham-thu-ha",
                AcademicDegree = "Cử nhân Sư phạm Tiếng Anh",
                GraduatedUniversity = "Đại học Sài Gòn",
                Position = "Trưởng bộ môn Tiếng Anh Học thuật",
                Subject = "Tiếng Anh",
                GradeLevels = "Cấp 1, Cấp 2",
                ExperienceYears = 8,
                TeachingPhilosophy = "Ngôn ngữ là phản xạ tự nhiên khi trẻ được đặt trong môi trường tương tác ấm áp, không sợ sai.",
                BioTimelineJson = "[{\"year\":\"2016-2020\",\"event\":\"Tốt nghiệp Sư phạm Tiếng Anh - ĐH Sài Gòn (IELTS 8.0)\"},{\"year\":\"2020-nay\",\"event\":\"Chuyên gia luyện thi Chứng chỉ Cambridge & Tiếng Anh vào Lớp 10\"}]",
                AvatarUrl = "assets/images/teachers/teacher-4.jpg",
                DisplayOrder = 4,
                IsFeatured = true,
                IsActive = true,
                SeoTitle = "Cô Phạm Thu Hà - Giáo viên Tiếng Anh ĐH Sài Gòn"
            }
        };
    }
}


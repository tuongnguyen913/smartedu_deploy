using System.ComponentModel.DataAnnotations;

namespace SmartEdu.PublicAPI.DTOs;

public class EnrollmentCreateDto
{
    [Required(ErrorMessage = "Vui lòng nhập họ tên phụ huynh/học sinh")]
    [MaxLength(200, ErrorMessage = "Họ tên không được vượt quá 200 ký tự")]
    public string ParentName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vui lòng nhập số điện thoại liên hệ")]
    [RegularExpression(@"^(03|05|07|08|09)+[0-9]{8}$", ErrorMessage = "Số điện thoại không hợp lệ (cần 10 chữ số với đầu số 03, 05, 07, 08, 09)")]
    public string PhoneNumber { get; set; } = string.Empty;

    public string? GradeLevel { get; set; }

    public int? BranchId { get; set; }

    public int? CourseId { get; set; }

    public string? StudentName { get; set; }

    public string? Email { get; set; }

    public string? LearningNeed { get; set; }

    public string? SourcePage { get; set; } = "PlacementTestModal";
}

public class EnrollmentResponseDto
{
    public bool Success { get; set; } = true;
    public string Message { get; set; } = string.Empty;
    public int? EnrollmentId { get; set; }
}


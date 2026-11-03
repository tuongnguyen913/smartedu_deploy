using SmartEdu.PublicAPI.Models;

namespace SmartEdu.PublicAPI.DTOs;

public class FacultyHeaderDto : PageHeaderDto
{
}

public class SubjectCountDto
{
    public string Subject { get; set; } = string.Empty;
    public int Count { get; set; }
}

public class FacultyTeachersResponseDto
{
    public int TotalTeachers { get; set; }
    public List<SubjectCountDto> Subjects { get; set; } = new();
    public List<Teacher> Teachers { get; set; } = new();
}

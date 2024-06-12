import Tooltip from "@mui/material/Tooltip";
import {Box} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export const ToolTipRegister = ()=>{
    return (
        <Tooltip
            title={
                <Box fontSize={14}>
                    Không thể thao tác với lớp lý thuyết (LT)
                    <br/>
                    <br/>
                    Khi đăng ký lớp bài tập (BT), lớp lý thuyết (LT) tương ứng sẽ được thêm
                    <br/>
                    <br/>
                    Các học phần liên quan đến nhau bắt buộc phải đăng ký cùng lúc, VD: 123456: Tin học đại
                    cương (LT+BT) và 987654: Tin học đại cương (TH)
                </Box>
            }
            enterDelay={500}
            leaveDelay={200}>
            <HelpOutlineIcon color={'action'}></HelpOutlineIcon>
        </Tooltip>
    )
}

export const ToolTipDeleteClass= ()=>{
    return (
        <Tooltip
            title={
                <Box fontSize={14}>
                    Chọn ít nhất 1 lớp để hủy
                    <br/>
                    <br/>
                    Không thể hủy lớp do người khác đăng ký hộ
                    <br/>
                    <br/>
                    Khi hủy lớp bài tập (BT), lớp lý thuyết (LT) tương ứng sẽ được hủy
                </Box>
            }
            enterDelay={500}
            leaveDelay={200}>
            <HelpOutlineIcon color={'action'}></HelpOutlineIcon>
        </Tooltip>
    )
}

export const ToolTipChangeSimilarClass = ()=>{
    return (
        <Tooltip
            title={
                <Box fontSize={14}>
                    Chức năng thay đổi lớp: dành cho trường hợp 2 lớp liên quan, VD: lý thuyết + bài tập và thực hành, sinh viên muốn đổi lớp thực hành, nhưng vẫn muốn giữ lại lớp lý thuyết
                    <br/>
                    <br/>
                    Chọn duy nhất 1 lớp để thay đổi
                    <br/>
                    <br/>
                    Không thể thay đổi lớp do người khác đăng ký hộ
                    <br/>
                    <br/>
                    Lớp được thay đổi phải có cùng loại, mã HP
                </Box>
            }
            enterDelay={500}
            leaveDelay={200}>
            <HelpOutlineIcon color={'action'}></HelpOutlineIcon>
        </Tooltip>
    )
}
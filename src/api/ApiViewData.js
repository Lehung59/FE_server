import API from "./api";
const END_POINT = {
  GetOptionsLogType: "ViewData/OptionLogType",
  GetOptionsLevelManage: "ViewData/OptionLevelManage",
  GetOptionsRole: "ViewData/OptionRole",
  GetOptionsStatus: "ViewData/OptionStatus",
  GetOptionsUsageStatus: "ViewData/OptionUsageStatus",
  GetOptionsLine: "ViewData/OptionLine",
  GetOptionsManagementCategory: "ViewData/OptionManagementCategory",
  GetOptionsMeasurementItem: "ViewData/OptionMeasurementItem",
  GetOptionsTypeFrequency: "ViewData/OptionTypeFrequency",
  GetOptionsMeasuringTool: "ViewData/OptionMeasuringTool",
  GetOptionsMeasuringToolMeasurementItem: "ViewData/OptionMeasuringToolMeasurementItem",
  GetOptionsMeasuringToolMeasurementItemByDay: "ViewData/OptionMeasuringToolMeasurementItemByDay",
  GetOptionsEvaluationStatus: "ViewData/OptionEvaluationStatus",
  //
  GetOptionsTypeRequest: "ViewData/OptionTypeRequest",
  GetOptionsRequestStatus: "ViewData/OptionRequestStatus",
};
class ApiViewData {
  GetOptionsLogType = () => {
    return API.get(`${END_POINT.GetOptionsLogType}`);
  };
  GetOptionsLevelManage = () => {
    return API.get(`${END_POINT.GetOptionsLevelManage}`);
  };
  GetOptionsRole = () => {
    return API.get(`${END_POINT.GetOptionsRole}`);
  };
  GetOptionsStatus = () => {
    return API.get(`${END_POINT.GetOptionsStatus}`);
  };
  GetOptionsUsageStatus = () => {
    return API.get(`${END_POINT.GetOptionsUsageStatus}`);
  };
  GetOptionsLine = () => {
    return API.get(`${END_POINT.GetOptionsLine}`);
  };
  GetOptionsManageCategory = () => {
    return API.get(`${END_POINT.GetOptionsManagementCategory}`);
  };
  GetOptionsMeasurementItem = () => {
    return API.get(`${END_POINT.GetOptionsMeasurementItem}`);
  };
  GetOptionsTypeFrequency = () => {
    return API.get(`${END_POINT.GetOptionsTypeFrequency}`);
  };
  GetOptionsMeasuringTool = () => {
    return API.get(`${END_POINT.GetOptionsMeasuringTool}`);
  };
  GetOptionsMeasuringToolMeasurementItem = (measuringToolId) => {
    return API.get(`${END_POINT.GetOptionsMeasuringToolMeasurementItem}/${measuringToolId}`);
  };
  GetOptionsMeasuringToolMeasurementItemByDay = (measuringToolId) => {
    return API.get(`${END_POINT.GetOptionsMeasuringToolMeasurementItemByDay}/${measuringToolId}`);
  };
  GetOptionsEvaluationStatus = () => {
    return API.get(`${END_POINT.GetOptionsEvaluationStatus}`);
  };
  GetOptionsTypeRequest = () => {
    return API.get(`${END_POINT.GetOptionsTypeRequest}`);
  };
  GetOptionsRequestStatus = () => {
    return API.get(`${END_POINT.GetOptionsRequestStatus}`);
  };
}
export default new ApiViewData();

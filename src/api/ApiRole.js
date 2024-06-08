import API from "./api";
const END_POINT = {
  GETALLBYLIMIT: "Role/GetAllByLimit",
  DELETEBBYID: "Role/DeleteById",
  BANNEDBYID: "Role/BannedById",
  GETITEMBYID: "Role/GetItemById",
  GETPERMISSIONBYROLEID: "Role/GetPermissionByRoleId",
  UPDATEROLECLAIMBYROLEID: "Role/UpdateRoleClaimByRoleId",
  EDITITEMBYID: "Role/EditItemById",
  CREATEITEM: "Role/CreateItem",
};
class ApiRole {
  GetAllByLimit = (args) => {
    return API.get(`${END_POINT.GETALLBYLIMIT}`, {
      params: {
        PageNumber: args.pageNumber || 1,
        PageSize: args.pageSize || 10,
        roleName: args.roleName ?? "",
      },
    });
  };

  DeleteById = (id) => {
    return API.delete(`${END_POINT.DELETEBBYID}/${id}`);
  };

  BannedById = (id) => {
    return API.put(`${END_POINT.BANNEDBYID}/${id}`);
  };

  GetItemById = (id) => {
    return API.get(`${END_POINT.GETITEMBYID}/${id}`);
  };
  GetPermissionByRoleId = (id) => {
    return API.get(`${END_POINT.GETPERMISSIONBYROLEID}/${id}`);
  };
  UpdateRoleClaimByRoleId = (roleId, claimType, claimValue) => {
    return API.put(`${END_POINT.UPDATEROLECLAIMBYROLEID}/${roleId}/${claimType}/${claimValue}`);
  };
  EditItemById = (formState) => {
    return API.put(`${END_POINT.EDITITEMBYID}`, formState);
  };
  CreateItem = (formState) => {
    return API.post(`${END_POINT.CREATEITEM}`, formState);
  };
}
export default new ApiRole();

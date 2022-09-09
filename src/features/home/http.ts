import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { getCookie } from "src/services/interceptor";

// 删除数据来源列表的数据
export const deletePageSource = createAsyncThunk(
  'pagesManage/deletePageSource',
  async (
    params: any,
    thunkAPI
  ) => {
    const cookie = getCookie('csrftoken');
    const header = cookie ? {
      headers: {
        'X-CSRFToken': cookie ? cookie : '',
      }
    } : {};
    const url = `/visual_MIDP/v1/page_template/delete_page`
    const response = await axios.post(url, params, header)
    return {
      status: response.data.status,
      msg: response.data.msg,
    }
  }
)


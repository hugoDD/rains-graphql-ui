<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="机器名称" prop="hostname">
        <el-input
          v-model="queryParams.hostname"
          placeholder="请输入机器名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable
                   size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['arthasMachineinfo:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['arthasMachineinfo:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['arthasMachineinfo:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['arthasMachineinfo:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="machineinfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="机器名称" align="center" prop="hostname"/>
      <el-table-column label="登录类型" align="center" prop="loginType"/>
      <el-table-column label="RSA" align="center" prop="rsaId"/>
      <el-table-column label="登陆账号" align="center" prop="username"/>
      <el-table-column label="密码" align="center" prop="password"/>
      <el-table-column label="SSH端口号" align="center" prop="port"/>
      <el-table-column label="agentIP" align="center" prop="arthasIp"/>
      <el-table-column label="agent端口" align="center" prop="arthasPort"/>
      <el-table-column label="agentId" align="center" prop="arthasAgentId"/>
      <el-table-column label="服务器连接状态" align="center" prop="serverStatus"/>
      <el-table-column label="模块名称" align="center" prop="moduleName"/>
      11
      <el-table-column label="状态" align="center" prop="status"
                       :formatter="statusFormat"/>
      <el-table-column label="创建时间" align="center" prop="createTime"/>
      <el-table-column label="创建人员ID" align="center" prop="createPersonId"/>
      <el-table-column label="操作人员名称" align="center" prop="createPersonName"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['arthasMachineinfo:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['arthasMachineinfo:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改ArthasMachineinfo对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="id" prop="id">
          <el-input v-model="form.id" placeholder="请输入id"/>
        </el-form-item>


        <el-form-item label="机器名称" prop="hostname">
          <el-input v-model="form.hostname" placeholder="请输入机器名称"/>
        </el-form-item>


        <el-form-item label="登录类型" prop="loginType">
          <el-input v-model="form.loginType" placeholder="请输入登录类型"/>
        </el-form-item>


        <el-form-item label="RSA" prop="rsaId">
          <el-input v-model="form.rsaId" placeholder="请输入RSA"/>
        </el-form-item>


        <el-form-item label="登陆账号" prop="username">
          <el-input v-model="form.username" placeholder="请输入登陆账号"/>
        </el-form-item>


        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"/>
        </el-form-item>


        <el-form-item label="SSH端口号" prop="port">
          <el-input v-model="form.port" placeholder="请输入SSH端口号"/>
        </el-form-item>


        <el-form-item label="agentIP" prop="arthasIp">
          <el-input v-model="form.arthasIp" placeholder="请输入agentIP"/>
        </el-form-item>


        <el-form-item label="agent端口" prop="arthasPort">
          <el-input v-model="form.arthasPort" placeholder="请输入agent端口"/>
        </el-form-item>


        <el-form-item label="agentId" prop="arthasAgentId">
          <el-input v-model="form.arthasAgentId" placeholder="请输入agentId"/>
        </el-form-item>


        <el-form-item label="服务器连接状态" prop="serverStatus">
          <el-input v-model="form.serverStatus" placeholder="请输入服务器连接状态"/>
        </el-form-item>


        <el-form-item label="模块名称" prop="moduleName">
          <el-input v-model="form.moduleName" placeholder="请输入模块名称"/>
        </el-form-item>


        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="form.createTime" placeholder="请输入创建时间"/>
        </el-form-item>


        <el-form-item label="创建人员ID" prop="createPersonId">
          <el-input v-model="form.createPersonId" placeholder="请输入创建人员ID"/>
        </el-form-item>


        <el-form-item label="操作人员名称" prop="createPersonName">
          <el-input v-model="form.createPersonName" placeholder="请输入操作人员名称"/>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    addArthasMachineinfo,
    delArthasMachineinfo,
    exportArthasMachineinfo,
    getArthasMachineinfo,
    listArthasMachineinfo,
    updateArthasMachineinfo
  } from "@/api/arthas/ArthasMachineinfoApi"
  import {requestParam} from "../../../utils"
  import {machineinfoinitQuery} from "../../../operation/ArthasMachineinfoQuery"

  export default {
    name: "ArthasMachineinfo",
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // machineinfo表格数据
        machineinfoList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 状态字典
        statusOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,

          hostname: undefined,

          status: undefined,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          hostname: [
            {required: true, message: "机器名称不能为空", trigger: "blur"}
          ],
          username: [
            {required: true, message: "登陆账号不能为空", trigger: "blur"}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: "blur"}
          ],
          arthasPort: [
            {required: true, message: "agent端口不能为空", trigger: "blur"}
          ],
        }
      }

    },
    created() {
      const req = Object.create(requestParam)
      this.loading = true;
      this.$graphql(machineinfoinitQuery, {request: req}).then(response => {
        this.machineinfoList = response.data.pages.data
        this.total = response.data.pages.total
        statusOptions = response.data.sysNormalDisable.data
        this.loading = false
      })
    },
    methods: {
      /** 查询ArthasMachineinfo列表 */
      getList() {
        this.loading = true
        listArthasMachineinfo(this.queryParams).then(response => {
          this.machineinfoList = response.data.pages.data
          this.total = response.data.pages.total
          this.loading = false;
        })
      }
      ,
      // 状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status);
      }
      ,

      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      }
      ,
      // 表单重置
      reset() {
        this.form = {
          id: undefined,
          hostname: undefined,
          loginType: undefined,
          rsaId: undefined,
          username: undefined,
          password: undefined,
          port: undefined,
          arthasIp: undefined,
          arthasPort: undefined,
          arthasAgentId: undefined,
          serverStatus: undefined,
          moduleName: undefined,
          status: undefined,
          createTime: undefined,
          createPersonId: undefined,
          createPersonName: undefined,
        }

        this.resetForm("form");
      }
      ,

      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      }
      ,
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      }
      ,
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id);
        this.single = selection.length != 1;
        this.multiple = !selection.length
      }
      ,
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加ArthasMachineinfo";
      }
      ,
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids;
        getArthasMachineinfo(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改ArthasMachineinfo";
        });
      }
      ,
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateArthasMachineinfo(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              addArthasMachineinfo(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("新增成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            }
          }
        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$confirm('是否确认删除编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delArthasMachineinfo(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      }
      ,
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return exportArthasMachineinfo(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function () {
        })
      }

    }
  }

</script>

<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="私钥名称" prop="rsaName">
        <el-input
          v-model="queryParams.rsaName"
          placeholder="请输入私钥名称"
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
          v-hasPermi="['arthasRsa:add']"
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
          v-hasPermi="['arthasRsa:edit']"
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
          v-hasPermi="['arthasRsa:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['arthasRsa:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="rsaList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="主键ID" align="center" prop="id"/>
      <el-table-column label="私钥名称" align="center" prop="rsaName"/>
      <el-table-column label="私钥内容" align="center" prop="rsaValue"/>
      <el-table-column label="私钥用户" align="center" prop="rsaUsername"/>
      <el-table-column label="私钥密码" align="center" prop="rsaPassword"/>
      11
      <el-table-column label="状态" align="center" prop="status"
                       :formatter="statusFormat"/>
      <el-table-column label="创建时间" align="center" prop="createTime"/>
      <el-table-column label="创建人员ID" align="center" prop="createPersonId"/>
      <el-table-column label="创建人员姓名" align="center" prop="createPersonName"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['arthasRsa:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['arthasRsa:remove']"
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

    <!-- 添加或修改ArthasRsa对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="主键ID" prop="id">
          <el-input v-model="form.id" placeholder="请输入主键ID"/>
        </el-form-item>


        <el-form-item label="私钥名称" prop="rsaName">
          <el-input v-model="form.rsaName" placeholder="请输入私钥名称"/>
        </el-form-item>


        <el-form-item label="私钥内容" prop="rsaValue">
          <el-input v-model="form.rsaValue" placeholder="请输入私钥内容"/>
        </el-form-item>


        <el-form-item label="私钥用户" prop="rsaUsername">
          <el-input v-model="form.rsaUsername" placeholder="请输入私钥用户"/>
        </el-form-item>


        <el-form-item label="私钥密码" prop="rsaPassword">
          <el-input v-model="form.rsaPassword" placeholder="请输入私钥密码"/>
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


        <el-form-item label="创建人员姓名" prop="createPersonName">
          <el-input v-model="form.createPersonName" placeholder="请输入创建人员姓名"/>
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
    addArthasRsa,
    delArthasRsa,
    exportArthasRsa,
    getArthasRsa,
    listArthasRsa,
    updateArthasRsa
  } from "@/api/arthas/ArthasRsaApi"
  import {requestParam} from "../../../utils"
  import {machineinfoinitQuery} from "../../../operation/ArthasMachineinfoQuery";

  export default {
    name: "ArthasRsa",
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
        // rsa表格数据
        rsaList: [],
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

          rsaName: undefined,

          status: undefined,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          rsaName: [
            {required: true, message: "私钥名称不能为空", trigger: "blur"}
          ],
          rsaValue: [
            {required: true, message: "私钥内容不能为空", trigger: "blur"}
          ],
          rsaUsername: [
            {required: true, message: "私钥用户不能为空", trigger: "blur"}
          ],
        }
      }

    },
    created() {
      const req = Object.create(requestParam)
      this.loading = true;
      this.$graphql(machineinfoinitQuery, {request: req}).then(response => {
          this.rsaList = response.data.pages.data
          this.total = response.data.pages.total
          statusOptions = response.data.sysNormalDisable.data
          this.loading = false;
        }
      )
    },
    methods: {
      /** 查询ArthasRsa列表 */
      getList() {
        this.loading = true
        listArthasRsa(this.queryParams).then(response => {
          this.rsaList = response.data.pages.data
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
          rsaName: undefined,
          rsaValue: undefined,
          rsaUsername: undefined,
          rsaPassword: undefined,
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
        this.title = "添加ArthasRsa";
      }
      ,
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids;
        getArthasRsa(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改ArthasRsa";
        });
      }
      ,
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateArthasRsa(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              addArthasRsa(this.form).then(response => {
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
          return delArthasRsa(ids);
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
          return exportArthasRsa(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function () {
        });
      }

    }
  }

</script>

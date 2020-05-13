<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="服务器地址" prop="hostname">
        <el-input
          v-model="queryParams.hostname"
          placeholder="请输入服务器地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="应用名称" prop="appname">
        <el-input
          v-model="queryParams.appname"
          placeholder="请输入应用名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['arthasCmdlog:add']"
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
          v-hasPermi="['arthasCmdlog:edit']"
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
          v-hasPermi="['arthasCmdlog:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['arthasCmdlog:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="cmdlogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="应用名称" align="center" prop="id"/>
      <el-table-column label="服务器地址" align="center" prop="hostname"/>
      <el-table-column label="应用名称" align="center" prop="appname"/>
      <el-table-column label="命令" align="center" prop="cmd"/>
      <el-table-column label="操作人员ID" align="center" prop="createPersonId"/>
      <el-table-column label="操作人员名称" align="center" prop="createPersonName"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['arthasCmdlog:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['arthasCmdlog:remove']"
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

    <!-- 添加或修改ArthasCmdlog对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="创建时间" prop="id">
          <el-input v-model="form.id" placeholder="请输入创建时间"/>
        </el-form-item>


        <el-form-item label="服务器地址" prop="hostname">
          <el-input v-model="form.hostname" placeholder="请输入服务器地址"/>
        </el-form-item>


        <el-form-item label="应用名称" prop="appname">
          <el-input v-model="form.appname" placeholder="请输入应用名称"/>
        </el-form-item>


        <el-form-item label="命令" prop="cmd">
          <el-input v-model="form.cmd" placeholder="请输入命令"/>
        </el-form-item>


        <el-form-item label="操作人员ID" prop="createPersonId">
          <el-input v-model="form.createPersonId" placeholder="请输入操作人员ID"/>
        </el-form-item>


        <el-form-item label="操作人员名称" prop="createPersonName">
          <el-input v-model="form.createPersonName" placeholder="请输入操作人员名称"/>
        </el-form-item>


        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.createTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择创建时间">
          </el-date-picker>
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
    addArthasCmdlog,
    delArthasCmdlog,
    exportArthasCmdlog,
    getArthasCmdlog,
    listArthasCmdlog,
    updateArthasCmdlog
  } from "@/api/arthas/ArthasCmdlogApi"
  import {requestParam} from "../../../utils";
  import {cmdloginitQuery} from "../../../operation/ArthasCmdlogQuery";

  export default {
    name: "ArthasCmdlog",
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
        // cmdlog表格数据
        cmdlogList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          hostname: undefined,
          appname: undefined,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          hostname: [
            {required: true, message: "服务器地址不能为空", trigger: "blur"}
          ],
          appname: [
            {required: true, message: "应用名称不能为空", trigger: "blur"}
          ]
        }
      }
    },
    created() {
      const req = Object.create(requestParam)
      this.loading = true;
      this.$graphql(cmdloginitQuery,{request: req}).then(response =>{
        this.cmdlogList = response.data.pages.data;
        this.total = response.data.pages.total;
        this.loading = false;
      })
    },
    methods: {
      /** 查询ArthasCmdlog列表 */
      getList() {
        this.loading = true
        listArthasCmdlog(this.queryParams).then(response => {
          this.cmdlogList = response.data.pages.data
          this.total = response.data.total;
          this.loading = false;
        })
      },

      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: undefined,
          hostname: undefined,
          appname: undefined,
          cmd: undefined,
          createPersonId: undefined,
          createPersonName: undefined,
          createTime: undefined,
        }

        this.resetForm("form");
      },

      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id);
        this.single = selection.length != 1;
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加ArthasCmdlog";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids;
        getArthasCmdlog(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改ArthasCmdlog";
        });
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateArthasCmdlog(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              addArthasCmdlog(this.form).then(response => {
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
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$confirm('是否确认删除编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delArthasCmdlog(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return exportArthasCmdlog(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function () {
        });
      }

    }
  }

</script>

<template>
  <div class="container">
    <Breadcrumb :items="['menu.file', 'menu.file.music']" />
    <a-card class="general-card" :title="$t('menu.file.music')">
      <a-row>
        <!--        <a-col :flex="1">-->
        <!--          <a-form-->
        <!--            :model="formModel"-->
        <!--            :label-col-props="{ span: 6 }"-->
        <!--            :wrapper-col-props="{ span: 18 }"-->
        <!--            label-align="left"-->
        <!--          >-->
        <!--            <a-row :gutter="16">-->
        <!--              <a-col :span="8">-->
        <!--                <a-form-item-->
        <!--                  field="number"-->
        <!--                  :label="$t('music.form.number')"-->
        <!--                >-->
        <!--                  <a-input-->
        <!--                    v-model="formModel.number"-->
        <!--                    :placeholder="$t('music.form.number.placeholder')"-->
        <!--                  />-->
        <!--                </a-form-item>-->
        <!--              </a-col>-->
        <!--              <a-col :span="8">-->
        <!--                <a-form-item field="name" :label="$t('music.form.name')">-->
        <!--                  <a-input-->
        <!--                    v-model="formModel.name"-->
        <!--                    :placeholder="$t('music.form.name.placeholder')"-->
        <!--                  />-->
        <!--                </a-form-item>-->
        <!--              </a-col>-->
        <!--              <a-col :span="8">-->
        <!--                <a-form-item-->
        <!--                  field="contentType"-->
        <!--                  :label="$t('music.form.contentType')"-->
        <!--                >-->
        <!--                  <a-select-->
        <!--                    v-model="formModel.contentType"-->
        <!--                    :options="contentTypeOptions"-->
        <!--                    :placeholder="$t('music.form.selectDefault')"-->
        <!--                  />-->
        <!--                </a-form-item>-->
        <!--              </a-col>-->
        <!--              <a-col :span="8">-->
        <!--                <a-form-item-->
        <!--                  field="filterType"-->
        <!--                  :label="$t('music.form.filterType')"-->
        <!--                >-->
        <!--                  <a-select-->
        <!--                    v-model="formModel.filterType"-->
        <!--                    :options="filterTypeOptions"-->
        <!--                    :placeholder="$t('music.form.selectDefault')"-->
        <!--                  />-->
        <!--                </a-form-item>-->
        <!--              </a-col>-->
        <!--              <a-col :span="8">-->
        <!--                <a-form-item-->
        <!--                  field="createdTime"-->
        <!--                  :label="$t('music.form.createdTime')"-->
        <!--                >-->
        <!--                  <a-range-picker-->
        <!--                    v-model="formModel.createdTime"-->
        <!--                    style="width: 100%"-->
        <!--                  />-->
        <!--                </a-form-item>-->
        <!--              </a-col>-->
        <!--              <a-col :span="8">-->
        <!--                <a-form-item-->
        <!--                  field="status"-->
        <!--                  :label="$t('music.form.status')"-->
        <!--                >-->
        <!--                  <a-select-->
        <!--                    v-model="formModel.status"-->
        <!--                    :options="statusOptions"-->
        <!--                    :placeholder="$t('music.form.selectDefault')"-->
        <!--                  />-->
        <!--                </a-form-item>-->
        <!--              </a-col>-->
        <!--            </a-row>-->
        <!--          </a-form>-->
        <!--        </a-col>-->
        <!--        <a-divider style="height: 84px" direction="vertical" />-->
        <!--        <a-col :flex="'86px'" style="text-align: right">-->
        <!--          <a-space direction="vertical" :size="18">-->
        <!--            <a-button type="primary" @click="search">-->
        <!--              <template #icon>-->
        <!--                <icon-search />-->
        <!--              </template>-->
        <!--              {{ $t('music.form.search') }}-->
        <!--            </a-button>-->
        <!--            <a-button @click="reset">-->
        <!--              <template #icon>-->
        <!--                <icon-refresh />-->
        <!--              </template>-->
        <!--              {{ $t('music.form.reset') }}-->
        <!--            </a-button>-->
        <!--          </a-space>-->
        <!--        </a-col>-->
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('music.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  <template #icon>
                    <icon-upload />
                  </template>
                  {{ $t('music.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('music.operation.download') }}
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column
            :title="$t('music.columns.number')"
            data-index="number"
          />
          <a-table-column :title="$t('music.columns.name')" data-index="name" />
          <a-table-column
            :title="$t('music.columns.artist')"
            data-index="artist"
          >
          </a-table-column>
          <a-table-column :title="$t('music.columns.album')" data-index="album">
          </a-table-column>
          <a-table-column
            :title="$t('music.columns.playNumber')"
            data-index="playNumber"
          />
          <a-table-column
            :title="$t('music.columns.createdTime')"
            data-index="createdTime"
          />
          <a-table-column
            :title="$t('music.columns.status')"
            data-index="status"
          >
            <template #cell="{ record }">
              <span v-if="record.status === 'offline'" class="circle"></span>
              <span v-else class="circle pass"></span>
              {{ $t(`music.status.${record.status}`) }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('music.columns.operations')"
            data-index="operations"
          >
            <template #cell>
              <a-button v-permission="['admin']" type="text" size="small">
                {{ $t('music.operations.more') }}
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import { queryMusicList, MusicRecord, MusicParams } from './api/index';

  const generateFormModel = () => {
    return {
      id: 0,
      number: 0,
      artist: '',
      album: '',
      playNumber: 0,
      createdTime: '',
      status: 'offline',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<MusicRecord[]>([]);
  const formModel = ref(generateFormModel());
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('music.form.status.online'),
      value: 'online',
    },
    {
      label: t('music.form.status.offline'),
      value: 'offline',
    },
  ]);
  const fetchData = async (
    params: MusicParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryMusicList(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as MusicParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
</style>

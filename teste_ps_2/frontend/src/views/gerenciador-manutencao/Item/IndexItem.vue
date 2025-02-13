<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="search"
          label="Buscar Item"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="4" class="d-flex align-start">
        <v-btn class="custom-width" color="primary" variant="flat" dark @click="searchItem" name="SearchButton">Buscar</v-btn>
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <v-btn class="custom-width-2" color="primary" variant="flat" dark @click="addItem" name="CreateButton">Cadastrar Item</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table class="border rounded-md" :headers="headers" :items="filteredItem">
          <template v-slot:top>
            <v-row>
              <v-col class="d-flex justify-end">
              </v-col>
            </v-row>
            <v-spacer />
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5 text-center py-6">Tem certeza que deseja deletar esse item?</v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" variant="outlined" dark @click="closeDelete">Cancelar</v-btn>
                  <v-btn color="primary" variant="flat" dark @click="deleteItem">OK</v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.actions="{ item }">
          <v-icon class="mdi mdi-eye me-2" color="primary" size="small" @click="goToDetail(item.id)" name="detailsList"/>
            <v-icon color="primary" size="small" class="me-2" @click="editItem(item.id)">
              mdi-pencil
            </v-icon>
            <v-icon color="error" size="small" @click="confirmDeleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-label>Sem dados!</v-label>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </template>


<script async setup lang="ts">
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ItemRequires from '../../../services/requires/ItemRequires';

const { list, remove, update, post } = ItemRequires();
const page = ref({ title: 'Item ' });
const breadcrumbs = ref([
  { text: 'Item', disabled: true, href: '#' },
  { text: '', disabled: true, href: '#' }
]);

const dialog = ref(false);
const router = useRouter();
const dialogDelete = ref(false);
const headers = ref([

  { title: 'ID', sortable: false, key: 'id' },
  { title: 'Tipo', sortable: false, key: 'tipo' },
  { title: 'Unidade de Medida', sortable: false, key: 'unidadeDeMedida' },
  { title: 'Descrição', sortable: false, key: 'descricao' },
  { title: 'Quantidade', sortable: false, key: 'quantidade' },

  { title: 'Ações', key: 'actions' }
]);
const Item = ref([]);
const filteredItem = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({});
const defaultItem = ref({});
const itemToDelete = ref<itemToDeleteInterface>();
const search = ref('');

interface ItemInterface {
id: string;
tipo: string;
unidadeDeMedida: string;
descricao: string;
quantidade: string;
}

interface itemToDeleteInterface {
  id: string;
}


const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Item' : 'Edit Item';
});

onMounted(() => {
  getPosts();
});

const getPosts = async () => {
  try {
    const data = await list();
    data.forEach((element: any) => {
      element.Data = dayjs(element.Data).format('DD/MM/YYYY');
    });
    Item.value = data;
    filteredItem.value = data;
  } catch (error) {
    console.error('Error fetching:', error);
  }
};

const deleteItem = async () => {
  //console.log(itemToDelete.value.id);
  if (itemToDelete.value) {
    try {
      await remove(itemToDelete.value.id);
      Swal.fire({
        title: "Deletado com sucesso!",
        icon: "success",
        confirmButtonColor: "#D3D3D3"
      });
      await getPosts();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar!",
        text: "Não foi possível apagar."
      });
    } finally {
      closeDelete();
    }
  }
};

function confirmDeleteItem(item) {
  //console.log(item);
  itemToDelete.value = item;
  dialogDelete.value = true;
}

function addItem() {
  router.push('/Item/formItem');
}

function editItem(id: any) {
  router.push({ path: `/Item/formItem/${id}` });
}

function goToDetail(id: any) {
  //console.log("teste id")
  //console.log(id)
  router.push({ path: `/Item/detailsItem/${id}` });
}

function closeDelete() {
  dialogDelete.value = false;
  itemToDelete.value = null;
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

const searchItem = () => {
  filterItem();
};

const filterItem = () => {
  if (!search.value) {
    filteredItem.value = Item.value;
  } else {
    const searchQuery = search.value.toLowerCase();
    filteredItem.value = Item.value.filter(item =>
      item.Nome.toLowerCase().includes(searchQuery)
    );
  }
};

watch(dialog, val => {
  if (!val) close();
});
watch(dialogDelete, val => {
  if (!val) closeDelete();
});
</script>

<style scoped>
.ementa-cell {
  white-space: normal;
  word-break: break-word;
  max-width: 800px;
}

.custom-width {
  height: 48px;
  width: 100px
}

.custom-width-2 {
  height: 48px;
  width: 200px;
}
</style>
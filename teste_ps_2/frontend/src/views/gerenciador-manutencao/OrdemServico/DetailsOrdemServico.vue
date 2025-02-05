<template>
<v-row justify="end" class="pa-3">
<v-btn color="error" class="ma-2" variant="outlined" @click="confirmDelete" name="DeleteButton">Excluir OrdemServico</v-btn>
<v-btn color="primary" class="ma-2" @click="editaOrdemServico(form.Id)" name="EditButton">Editar OrdemServico</v-btn>
</v-row>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <form @submit.prevent="onSubmit">
        <v-card elevation="10" class="" rounded="md">
            <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                <v-row >

                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">status</v-label>
                        <VTextField  type="text" placeholder="status string" hide-details v-model='form.Status' disabled name="Status"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">DataAbertura</v-label>
                        <VTextField  type="datetime" placeholder="DataAbertura datetime" hide-details v-model='form.DataAbertura' disabled name="DataAbertura"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">DataFinalizacao</v-label>
                        <VTextField  type="datetime" placeholder="DataFinalizacao datetime" hide-details v-model='form.DataFinalizacao' disabled name="DataFinalizacao"></VTextField>
                    </v-col>
                                    <v-col cols="12">
                                        <v-label class="font-weight-medium mb-2">Equipamento</v-label>
                                        <v-select :items="EquipamentoOptions" item-title="Id" item-value="Id" placeholder="Select Equipamento" hide-details v-model="form.EquipamentoId" disabled name="Equipamento"></v-select>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-label class="font-weight-medium mb-2">Manutencao</v-label>
                                        <v-select :items="ManutencaoOptions" item-title="Id" item-value="Id" placeholder="Select Manutencao" hide-details v-model="form.ManutencaoId" disabled name="Manutencao"></v-select>
                                    </v-col>

                </v-row>
            </v-card-text>
        </v-card>
    </form>
    <!-- Diálogo de Confirmação de Exclusão -->
    <v-dialog v-model="dialogDelete" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">Confirmar Exclusão</v-card-title>
            <v-card-text>Tem certeza de que deseja excluir esta OrdemServico?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deletaOrdemServico" name="confirmDeleteButton">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script async setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import OrdemServicoService from '../../../services/requires/OrdemServicoRequires';
import EquipamentoService from '../../../services/requires/EquipamentoRequires';
import ManutencaoService from '../../../services/requires/ManutencaoRequires';

import dayjs from 'dayjs';

const { list: listEquipamento } = EquipamentoService();
const { list: listManutencao } = ManutencaoService();

const { list, remove, getById } = OrdemServicoService();
const route = useRoute();
const params = route.params;
const router = useRouter();
const dialogDelete = ref(false);

const EquipamentoOptions = ref([]);
const ManutencaoOptions = ref([]);

const form = reactive({
    id: '',
    Status: '',
    DataAbertura: '',
    DataFinalizacao: '',
    EquipamentoId: '',
    ManutencaoId: ''
});


const verificaArrayParams = () => {
    if (typeof params.id === 'string') {
        return params.id;
    } else if (Array.isArray(params.id)) {
        return params.id[0];
    }
    return '';
};

const getPost = async (id: any) => {
    try {
        let response = await getById(id);
        Object.assign(form, response.value[0]);


    } catch (error) {
        console.error(error);
    }
};


const page = ref({ title: 'Detalhes OrdemServico' });

onMounted(async () => {
    if (params.id) {
        await getPost(params.id);
        page.value.title = 'Detalhes OrdemServico';
        breadcrumbs.value[1].text = page.value.title;
    }

    let response;

                    response = await listEquipamento();
                    EquipamentoOptions.value = response.value;
                    response = await listManutencao();
                    ManutencaoOptions.value = response.value;

});

const breadcrumbs = ref([
    {
        text: 'OrdemServico',
        disabled: false,
        href: '/OrdemServico/IndexOrdemServico'
    },
    {
        text: page.value.title,
        disabled: true,
        href: '#'
    }
]);

const navigateBack = () => {
    router.push({ path: '/OrdemServico/IndexOrdemServico' });
};

function editaOrdemServico(id) {
    router.push({ path: `/OrdemServico/formOrdemServico/${id}` });
}

function confirmDelete() {
    dialogDelete.value = true;
}

const deletaOrdemServico = async () => {
    try {
        await remove(form.Id);
        Swal.fire({
        title: "Deletado com sucesso!",
        icon: "success",
        confirmButtonColor: "#D3D3D3"
      });
      router.push({ path: '/OrdemServico/IndexOrdemServico' });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar!",
        text: "Não foi possível apagar."
      });
    } finally {
        dialogDelete.value = false;
    }
};




</script>
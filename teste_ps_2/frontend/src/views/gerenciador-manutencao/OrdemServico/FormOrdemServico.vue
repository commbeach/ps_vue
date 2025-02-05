<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <form @submit.prevent="onSubmit">
        <v-card elevation="10" class="" rounded="md">
            <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                <v-row >

                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">status</v-label>
                        <VTextField  type="text" placeholder="status string" hide-details v-model='form.Status' name="status"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">DataAbertura</v-label>
                        <VTextField  type="datetime" placeholder="DataAbertura datetime" hide-details v-model='form.DataAbertura' name="DataAbertura"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">DataFinalizacao</v-label>
                        <VTextField  type="datetime" placeholder="DataFinalizacao datetime" hide-details v-model='form.DataFinalizacao' name="DataFinalizacao"></VTextField>
                    </v-col>
                                    <v-col cols="12">
                                        <v-label class="font-weight-medium mb-2">Equipamento</v-label>
                                        <v-select :items="EquipamentoOptions" item-title="Id" item-value="Id" placeholder="Select Equipamento" hide-details v-model="form.EquipamentoId" name="Equipamento"></v-select>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-label class="font-weight-medium mb-2">Manutencao</v-label>
                                        <v-select :items="ManutencaoOptions" item-title="Id" item-value="Id" placeholder="Select Manutencao" hide-details v-model="form.ManutencaoId" name="Manutencao"></v-select>
                                    </v-col>

                    <v-col cols="12" class="d-flex justify-end">
                        <v-btn type="button" color="primary" variant="outlined" class="mr-3" @click='navigateBack' name="NavBackButton">Voltar</v-btn>
                        <v-btn type="submit" color="primary" flat name="SubmitButton">{{ submitButtonText }}</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </form>
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

const { list, post, getById, update } = OrdemServicoService();
const route = useRoute();
const params = route.params;
const router = useRouter();

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

const onSubmit = async () => {
    try {
        if (params.id) {

            form.id = verificaArrayParams()

            await update(form);
        } else {

            await post(form);
        }
        Swal.fire({
            title: "Salvo com sucesso!",
            icon: "success",
            confirmButtonColor: "#D3D3D3"
        }).then(()=>{
            router.push({ path: '/OrdemServico/IndexOrdemServico' });
        }
        );

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Erro ao salvar!",
            confirmButtonColor: "#D3D3D3"
        });
    }
};

const page = ref({ title: 'Cadastrar OrdemServico' });
const submitButtonText = ref('Cadastrar OrdemServico');

onMounted(async () => {
    if (params.id) {
        await getPost(params.id);
        page.value.title = 'Editar OrdemServico';
        breadcrumbs.value[1].text = page.value.title;
        submitButtonText.value = 'Editar OrdemServico';
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




</script>
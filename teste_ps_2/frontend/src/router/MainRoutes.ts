const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
    {
    name: 'Index',
    path: '/',
    component: () => import('@/views/index.vue'),
    },

    {

        name: 'Item',
        path: '/Item/IndexItem',
        component: () => import('@/views/gerenciador-manutencao/Item/IndexItem.vue'),
    },
    {
        name: 'DetalhesItem',
        path: '/Item/DetailsItem/:id?',
        component: () => import('@/views/gerenciador-manutencao/Item/DetailsItem.vue'),
        props: true
    },
    {
        name: 'CadastroItem',
        path: '/Item/formItem/:id?/:Item?',
        component: () => import('@/views/gerenciador-manutencao/Item/FormItem.vue'),
    },
    {

        name: 'Manutencao',
        path: '/Manutencao/IndexManutencao',
        component: () => import('@/views/gerenciador-manutencao/Manutencao/IndexManutencao.vue'),
    },
    {
        name: 'DetalhesManutencao',
        path: '/Manutencao/DetailsManutencao/:id?',
        component: () => import('@/views/gerenciador-manutencao/Manutencao/DetailsManutencao.vue'),
        props: true
    },
    {
        name: 'CadastroManutencao',
        path: '/Manutencao/formManutencao/:id?/:Manutencao?',
        component: () => import('@/views/gerenciador-manutencao/Manutencao/FormManutencao.vue'),
    },
    {

        name: 'Modelo',
        path: '/Modelo/IndexModelo',
        component: () => import('@/views/gerenciador-manutencao/Modelo/IndexModelo.vue'),
    },
    {
        name: 'DetalhesModelo',
        path: '/Modelo/DetailsModelo/:id?',
        component: () => import('@/views/gerenciador-manutencao/Modelo/DetailsModelo.vue'),
        props: true
    },
    {
        name: 'CadastroModelo',
        path: '/Modelo/formModelo/:id?/:Modelo?',
        component: () => import('@/views/gerenciador-manutencao/Modelo/FormModelo.vue'),
    },
    {

        name: 'Equipamento',
        path: '/Equipamento/IndexEquipamento',
        component: () => import('@/views/gerenciador-manutencao/Equipamento/IndexEquipamento.vue'),
    },
    {
        name: 'DetalhesEquipamento',
        path: '/Equipamento/DetailsEquipamento/:id?',
        component: () => import('@/views/gerenciador-manutencao/Equipamento/DetailsEquipamento.vue'),
        props: true
    },
    {
        name: 'CadastroEquipamento',
        path: '/Equipamento/formEquipamento/:id?/:Equipamento?',
        component: () => import('@/views/gerenciador-manutencao/Equipamento/FormEquipamento.vue'),
    },
    {

        name: 'OrdemServico',
        path: '/OrdemServico/IndexOrdemServico',
        component: () => import('@/views/gerenciador-manutencao/OrdemServico/IndexOrdemServico.vue'),
    },
    {
        name: 'DetalhesOrdemServico',
        path: '/OrdemServico/DetailsOrdemServico/:id?',
        component: () => import('@/views/gerenciador-manutencao/OrdemServico/DetailsOrdemServico.vue'),
        props: true
    },
    {
        name: 'CadastroOrdemServico',
        path: '/OrdemServico/formOrdemServico/:id?/:OrdemServico?',
        component: () => import('@/views/gerenciador-manutencao/OrdemServico/FormOrdemServico.vue'),
    },
    ]
};

export default MainRoutes;
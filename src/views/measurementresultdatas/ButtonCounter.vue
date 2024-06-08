<template>
    <div>
        <a-modal v-model:visible="propsParent.showModal" title="Basic Modal" @ok="handleOk" @cancel="handleCancel">
            <h1>button heading: {{ actType }}</h1>
            <span>My input</span> <input type="text" v-model="actType" />
            <button class="modal-default-button" @click="$emit('close')">OK</button>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, defineModel, defineProps, defineEmits, onUpdated, onMounted, ref, reactive } from "vue";
export default defineComponent({
    name: "Child",
    emits: ['click'],
    props: {
        actType: {
            type: String
        },
        idMesResultData: {
            type: Number
        },
        showModal: {
            type: Boolean
        }
    },
    components: {
        // call component
    },
    setup(props, context) {
        /**
        *** modal them moi
        *** 
        * **/
        const propsParent = ref(props);
        const handleOk = e => {
            console.log(e);
            console.log('click handleOk');
        };
        const handleCancel = e => {
            context.emit('close');
            console.log(e);
            propsParent.showModal = false;
            console.log('click handleCancel', propsParent);
        };
        /**
         * end modal them moi
         * **/
        onUpdated(() => {
            if (propsParent.showModal == false) {
                console.log('updateed:false');
            } else {
                console.log('updateed:true');
            }
        })
        onMounted(() => {
            console.log('props:', props);
            console.log('propsParent:', propsParent);
        })
        return {
            handleOk,
            handleCancel,
            props,
            propsParent
        };
    },
    // methods: {
    //     close() {
    //         this.$emit('close');
    //     }
    // }
});
</script>


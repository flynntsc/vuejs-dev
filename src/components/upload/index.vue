<template>
    <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
            <div class="weui_uploader">
                <div class="weui_uploader_hd weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">{{title}}</div>
                    <div class="weui_cell_ft">{{number}}/1</div>
                </div>
                <div class="weui_uploader_bd">
                    <ul class="weui_uploader_files">
                        <li @click="removeImg" class="weui_uploader_file" :class="classes" :style="styleBg">
                            <div v-show="number<1" class="weui_uploader_status_content">
                                <i class="weui_icon_warn"></i>
                            </div>
                        </li>
                    </ul>
                    <div class="weui_uploader_input_wrp">
                        <input @change="preview" class="weui_uploader_input" type="file" accept="image/jpg,image/jpeg,image/png,image/gif">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '图片上传',
        },
        number: {
            type: Number,
            default: 0,
        },
        styleBg: {
            type: String,
            default: 'background-image:url(http://shp.qpic.cn/weixinsrc_pic/pScBR7sbqjOBJomcuvVJ6iacVrbMJaoJZkFUIq4nzQZUIqzTKziam7ibg/)'
        },
    },
    methods: {
        preview(event) {
            const img = event.target.files[0];
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                this.styleBg = `background-image:url(${reader.result})`;
            })
            if (img) {
                reader.readAsDataURL(img)
                this.number = 1;
            }
        },
        removeImg(event) {
            this.number = 0;
            // 需删除input的图片
        }
    },
    computed: {
        classes() {
            return this.number < 1 ? 'weui_uploader_status' : ''
        }
    }
}
</script>

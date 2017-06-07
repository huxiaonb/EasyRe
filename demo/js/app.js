
document.domain = (function(location){
    var host = location.hostname
    var arr = host.split('.')
    if (arr.length <= 2)
        return host
    return arr[(arr.length - 2)] + "." + arr[(arr.length - 1)]
})(window.location)

$(_.once(function(){
    var status = true;
    function getCookie(name){
        var cookieStr=document.cookie;
        if(cookieStr.length>0){
            var start =cookieStr.indexOf(name+"=");
            if(start>-1){
                start+=name.length+1;
                var end = cookieStr.indexOf(";",start);
                if(end===-1){
                    end=cookieStr.length;
                }
                return decodeURIComponent(cookieStr.slice(start,end));
            }
        }
        return "";
    }

    //模拟第三方登录   写入cookie
    if(!getCookie('3rd_token')){
        window.location = './login.html';
    }

    //初始化  创建演示用group
    var groupId;
    $.ajax({
        url : "http://yun.wpscj.cn/lego" + '/api/v1/groups',
        async : false,
        type : 'POST',
        contentType :'application/json',
        data: JSON.stringify({
            name: 'file_component_demo_group' + (Math.floor(Math.random() * (999999 - 0 + 1) + 0))
        }),
        dataType: 'json',
        success: function(data){
            if(data.id && data.id !== 0){
                groupId = data.id;
            }
        },
        error:function(err){
            console.log(err);
        }
    });
    // 复制代码到剪切板
    ZeroClipboard.config({
        hoverClass: "btn-clipboard-hover"
    })
    $.fn.clipboard = function(){
        var clipboard = new ZeroClipboard(this);
        var instanceEl = $('#global-zeroclipboard-html-bridge')
        clipboard.on('ready', function(){
            instanceEl.data("placement", "top").attr("title", "Copy to clipboard").tooltip()
        })
        clipboard.on("copy", function(e) {
            var c = $(e.target).parent().nextAll(".highlight").first();
            e.clipboardData.setData('text/plain', c.text().trim())
        })
        clipboard.on("aftercopy", function() {
            instanceEl.attr("title", "Copied!").tooltip("fixTitle").tooltip("show").attr("title", "Copy to clipboard").tooltip("fixTitle")
        })
        clipboard.on("error", function() {
            instanceEl.attr("title", "Flash required").tooltip("fixTitle").tooltip("show")
        })
    }
    var util = {
        encodeText: function encodeText(t){
            if (!t) return '';
            t = t.replace(/ /g, '&nbsp;');
            t = t.replace(/\t/g, '&nbsp; &nbsp;');
            t = t.replace(/\>/g, '&gt;');
            t = t.replace(/\</g, '&lt;');
            t = t.replace(/\r\n|\n|\r/g, '<br>');
            t = t.replace(/\'/g, '&acute;');
            t = t.replace(/\"/g, '&quot;');
            t = t.replace(/ /g, '&nbsp;'); // 编码全角空格
            return t;
        }
    }
    var tpl = {
        section: $('#tpl-example-section').html(),
        install: $('#tpl-install').html(),
        initcomponent: $('#tpl-initcomponent').html(),
        login: $('#tpl-login').html(),
        upload: $('#tpl-upload').html(),
        preview: $('#tpl-preview').html(),
        edit: $('#tpl-edit').html(),
        download: $('#tpl-download').html(),
        fileSelector :$('#tpl-fileSelector').html(),
        history: $('#tpl-history').html(),
        permission: $('#tpl-permission').html(),
        sidenav: $('#tpl-sidenav').html()
    }
    $('script[type="text/template"]').remove()

    //Lego('.createG').createGroup();
    var fileid,nameForEdit;
    var initSection = function(name, $section){
        if(name === 'upload'){
            Lego('.fileupload-example').fileUpload({
                multi: false,
                groupid : groupId,
                afterUpload: function (data) {
                    console.log(data);
                    nameForEdit  = data.fname;
                    fileid = data.fileid;
                    initCompByFileid(fileid,nameForEdit)
                }
            })
        } else if (name === "preview") {
            $section.on('click', '.preview-example-btn', function(e){
                Lego(".preview-example").preview("destory")
                Lego(".preview-example").preview({
                    groupid:groupId,
                    fileid: fileid,
                    newWindow: $(this).data('open')
                });
            })
        } else if (name === "fileSelector") {
            Lego(".fileSelector-example").fileSelector({
                groupid:groupId,
                onSelect : function(file){
                    console.log(file);
                }
            });
        }
    }
    var initCompByFileid = function(fileid,nameForEdit){
        // 编辑
        Lego("button.edit-example-btn").edit('destory')
        Lego("button.edit-example-btn").edit({
            fileid: fileid, //文件的id （从上传文档的回调函数中可以拿到
            name: nameForEdit
        });
        // 下载
        Lego("button.download-example-btn").download('destory')
        Lego("button.download-example-btn").download({
            groupid : groupId,
            fileid: fileid
        });

    }

    var sections = [
    {
        id: 'install',
        title: '安装'
    }, 
    // {
    //     id: 'initcomponent',
    //     title: '组件初始化'
    // }, 
    /*{
        id: 'login',
        title: '单点登录'
    },*/ 
    {
        id: 'upload',
        title: '上传'
    }, {
        id: 'preview',
        title: '预览'
    }, {
        id: 'edit',
        title: '编辑'
    }, {
        id: 'download',
        title: '下载'
    }, {
        id : 'fileSelector',
        title: '文档选择器'
        },
    // {
    //     id: 'history',
    //     title: '历史版本'
    // }, {
    //     id: 'permission',
    //     title: '权限控制'
    // }
    ]
    var $sections = $('.docs-sections-container')
    // 渲染区块
    _.each(sections, function(section){
        if(!tpl[section.id]) return;
        var html = _.template(tpl.section)({data: section})
        var $html = $(html)
        $html = $html.append(_.template(tpl[section.id])({}))
        $sections.append($html)
        initSection(section.id, $html)
    })
    // 渲染侧边栏
    $('.docs-sidenav-container').append(_.template(tpl.sidenav)({list: _.filter(sections, function(i){
        return !!tpl[i.id]
    })}))
     
    // 侧边栏滚动
    $('body').scrollspy({ target: '.bs-docs-sidebar' })
    $('.bs-docs-sidebar').affix({
        offset: {
            top: function() {
                var c = $('.bs-docs-sidebar').offset().top
                  , d = parseInt($('.bs-docs-sidebar').children(0).css("margin-top"), 10)
                  , e = $(".bs-docs-nav").height();
                return this.top = c - e - d
            },
            bottom: function () {
              return (this.bottom = $('.footer').outerHeight(true))
            }
        }
    })
    // 代码高亮
    $('pre[data-encode]').each(function(){
        $(this).html(util.encodeText($(this).html()).trim());
    })
    $(".highlight").each(function() {
        var b = '<div class="zero-clipboard"><span class="btn-clipboard">Copy</span></div>';
        $(this).before(b)
    });
    
    $('.highlight > pre').each(function(){
        hljs.highlightBlock(this)
    })

    $('.btn-clipboard').clipboard()
    $('#fullchkbtn').bind("click", function(){
        if(status){
            Lego("fileSelector-example").edit('destory')
            Lego(".fileSelector-example").fileSelector({
                groupid:groupId,
                fullScreen:true,
                onSelect : function(file){
                    console.log(file);
                }
            });
        }else{
            Lego("fileSelector-example").edit('destory')
            Lego(".fileSelector-example").fileSelector({
                groupid:groupId,
                onSelect : function(file){
                    console.log(file);
                }
            });
        }
        status = !status
    });

    // 添加文件按钮
    // $('body').on('click', '.file-input-btn', function(e){
    //     $(this).find('input[type="file"]').click()
    // })
    // $('body').on('click', '.file-input-btn input[type="file"]', function(e){
    //     e.stopPropagation() 
    // })
}))
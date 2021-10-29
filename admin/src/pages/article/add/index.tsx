import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './index.scss'
import { articleAdd } from '../../../../api/article'
import {
  Button,
  Input,
  Form,
  Tag,
  Tooltip,
  message,
} from 'antd'
import {
  PlusOutlined,
} from '@ant-design/icons'
// import { ValidateStatus } from 'antd/lib/form/FormItem'

export default function Page() {
  // const [ title , setTitle] = useState<{
  //   value: string;
  //   validateStatus?: ValidateStatus;
  //   errorMsg?: string | null;
  // }>({
  //   value: '',
  // })

  // const [ tags , setTags] = useState<{
  //   value: string;
  //   validateStatus?: ValidateStatus;
  //   errorMsg?: string | null;
  // }>({
  //   value: '',
  // })

  // const [ content , setContent] = useState<{
  //   value: string;
  //   validateStatus?: ValidateStatus;
  //   errorMsg?: string | null;
  // }>({
  //   value: '',
  // })

  /**
   * 
   * @description 添加文章
   */
  const articleAddApi = async (params: any) => {
    const res = await articleAdd(params)

    if(res.code === 200) {
      message.success('保存成功')
    }else {
      message.success('保存失败')
    }
  }

  /**
   * 
   * @description 校验通过
   */
  const onFinish = (values: {
    title: string,
    tags: string[],
    content: string
  }) => {
    console.log('Success:', values);
    articleAddApi({
      ...values,
      tags: Array.isArray(values.tags) ? values.tags.join(',') : values.tags,
    })
  };

  /**
   * 
   * @description 校验失败
   */
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // /**
  //  * 
  //  * @description 校验标题
  //  */
  // const validateTitle = (
  //   val: string,
  // ): { validateStatus: ValidateStatus; errorMsg: string | null } => {
  //   if (val?.length) {
  //     return {
  //       validateStatus: 'success',
  //       errorMsg: null,
  //     };
  //   }
  //   return {
  //     validateStatus: 'error',
  //     errorMsg: '请输入标题',
  //   };
  // }

  // const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(() => ({
  //     ...validateTitle(e.target.value),
  //     value: e.target.value,
  //   }))
  // }

  // /**
  //  * 
  //  * @description 校验内容
  //  */
  // const validateContent = (
  //   val: string,
  // ): { validateStatus: ValidateStatus; errorMsg: string | null } => {
  //   if (val?.length) {
  //     return {
  //       validateStatus: 'success',
  //       errorMsg: null,
  //     };
  //   }
  //   return {
  //     validateStatus: 'error',
  //     errorMsg: '请输入内容',
  //   };
  // }

  return (
    <div>
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
        layout="vertical"
      >
        <Form.Item
          label="标题"
          name="title"
          // validateStatus={title.validateStatus}
          // help={title.errorMsg}
          rules={[{ required: true, message: '请输入文章标题' }]}
        >
          <Input
            className={styles.title}
            // value={title.value}
            placeholder="请输入文章标题"
            // onChange={handleTitleChange}
          />
        </Form.Item>

        <Form.Item
          label="标签"
          name="tags"
          rules={[{ required: true, message: '请输入文章标签' }]}
        >
          <EditableTagGroup />
        </Form.Item>

        
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '请输入文章内容' }]}
          // validateStatus={content.validateStatus}
          // help={content.errorMsg}
        >
          {/* <div id="editor"></div> */}
          <Editor />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function EditableTagGroup(props: any) {
  const [ state, setState ] = useState({
    tags: ([] as string[]),
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  })

  const handleClose = (removedTag: string) => {
    const tags = state.tags.filter(tag => tag !== removedTag)
    setState(data => ({
      ...data,
      tags,
    }))
  }

  const showInput = () => {
    // setState({ inputVisible: true }, () => input.focus())
    setState(data => ({
      ...data,
      inputVisible: true,
    }))
  }

  const handleInputChange = (e: { target: { value: any } }) => {
    setState(data => ({
      ...data,
      inputValue: e.target.value,
    }))
  }

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { tags } = state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    setState(data => ({
      ...data,
      tags,
      inputVisible: false,
      inputValue: '',
    }))
  }

  const handleEditInputChange = (e: { target: { value: any } }) => {
    setState(data => ({
      ...data,
      editInputValue: e.target.value,
    }))
  }

  const handleEditInputConfirm = () => {
    setState(data => {
      const { tags, editInputIndex, editInputValue, } = data
      const newTags = [...tags]
      newTags[editInputIndex] = editInputValue

      return {
        ...data,
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      }
    })
  }

  useEffect(() => {
    props.onChange(state.tags)
  }, [ state.tags ])

  const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = state

  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              size="small"
              // ref={saveEditInputRef}
              style={{ width: 100 }}
              key={tag}
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 5;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={index !== 0}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={e => {
                if (index !== 0) {
                  // setState({ editInputIndex: index, editInputValue: tag }, () => {
                  //   editInput.focus()
                  // })
                  setState(
                    data => ({
                      ...data,
                      editInputIndex: index,
                      editInputValue: tag,
                    }),
                  )
                  // editInput.focus()
                  // saveEditInputRef.current.focus()

                  e.preventDefault()
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          // ref={saveInputRef}
          type="text"
          size="small"
          style={{ width: 100 }}
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  )
}

function Editor(props: any) {
  useEffect(() => {
    // articleList({})

    var editor = (window as any).editormd("editor", {
      width: "100%",
      height: 740,
      // theme : "dark",
      // previewTheme : "dark",
      // editorTheme : "pastel-on-dark",
      placeholder: "请输入文章内容",
      codeFold : true,
      //syncScrolling : false,
      saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
      searchReplace : true,
      //watch : false,                // 关闭实时预览
      htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启    
      //toolbar  : false,             //关闭工具栏
      //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
      emoji: true,
      taskList: true,
      tocm: true,         // Using [TOCM]
      tex: true,                   // 开启科学公式TeX语言支持，默认关闭
      flowChart: true,             // 开启流程图支持，默认关闭
      sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
      //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
      //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
      //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
      //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
      //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
      imageUpload: true,
      imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
      imageUploadURL: "./php/upload.php",
      onload() {
          // console.log('onload', this);
          //fullscreen();
          //unwatch();
          //watch().fullscreen();

          //setMarkdown("#PHP");
          //width("100%");
          //height(480);
          //resize("100%", 640);
      },
      onchange() {
        const val = this.getValue()
        props.onChange(val)
      },
      path: "https://cdn.jsdelivr.net/npm/editor.md@1.5.0/lib/"  // Autoload modules mode, codemirror, marked... dependents libs path
    })

    return () => {
      
    }
  }, [])

  return (
    <>
      <div id="editor"></div>
    </>
  )
}
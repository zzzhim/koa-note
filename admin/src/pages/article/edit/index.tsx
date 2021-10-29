import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './index.scss'
import { articleUpdate, articleDetails } from '../../../../api/article'
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
import { history } from 'umi'

export default function Page() {
  const [ form ] = Form.useForm();
  const [ article, setArticle ] = useState<any>({})

  /**
   * 
   * @description 更新文章
   */
  const articleUpdateApi = async (params: any) => {
    const res = await articleUpdate(params)

    if(res.code === 200) {
      message.success('编辑成功')
    }else {
      message.warning('编辑失败')
    }
  }

  const articleDetailsApi = async () => {
    const { id = null } = history.location.query as any

    if(!id) {
      return 
    }

    const res = await articleDetails({ id })

    if(res.code === 200) {
      setArticle(res.data.article)
      console.log(res.data.article)

      form.setFieldsValue({
        title: res.data.article.title || '',
        tags: res.data.article.tags,
        content: res.data.article.content || '',
      })
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
    articleUpdateApi({
      id: history.location.query?.id,
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

  useEffect(() => {
    articleDetailsApi()
  }, [])

  return (
    <div>
      <Form
        form={form}
        name="basic"
        initialValues={{
          title: article?.title
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
        layout="vertical"
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入文章标题' }]}
        >
          <Input
            className={styles.title}
            placeholder="请输入文章标题"
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
        >
          {/* <div id="editor"></div> */}
          <Editor defaultContent={article?.content} />
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

function EditableTagGroup({ value = '', onChange }: any) {
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
    onChange(state.tags)
  }, [ state.tags ])

  useEffect(() => {
    setState(data => ({
      ...data,
      tags: typeof value === 'string' ? value.split(',') : data.tags,
    }))
  }, [ value ])

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

function Editor({ defaultContent = '', value = '', onChange }: any) {
  const [ editor, setEditor ] = useState<any>(null)

  useEffect(() => {
    const editor = (window as any).editormd("editor", {
      width: "100%",
      height: 740,
      value: '1',
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
        onChange(val)
      },
      path: "https://cdn.jsdelivr.net/npm/editor.md@1.5.0/lib/"  // Autoload modules mode, codemirror, marked... dependents libs path
    })

    setEditor(() => editor)

    return () => {}
  }, [])

  useEffect(() => {
    if(editor) {
      setTimeout(() => {
        editor.setValue(defaultContent)
      }, 200)
    }
  }, [ defaultContent ])

  return (
    <>
      <div id="editor"></div>
    </>
  )
}
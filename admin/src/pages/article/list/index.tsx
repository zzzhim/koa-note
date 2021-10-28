import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './index.scss'
import { Table, Tag, Space, Button, Modal, message } from 'antd'
import { articleList, articleDel } from '../../../../api/article'
import { history } from 'umi'
import dayjs from 'dayjs'

export default function Page() {
  const [ count, setCount ] = useState<number>(0)
  const [ current, setCurrent ] = useState<number>(1)
  const [ list, setList ] = useState<any[]>([])
  const [ loading, setLoading ] = useState<boolean>(false)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      align: 'center',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: '文章内容',
      dataIndex: 'content',
      align: 'center',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      align: 'center',
      render: (tags: any[]) => (
        <>
          {tags.map((tag: string, index) => {
            let color = tag?.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={index}>
                {tag?.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      render(val: Date) {
        return <>{ dayjs(val).format('YYYY-MM-DD HH:mm:ss') }</>
      }
    },
    {
      title: '最近更新',
      dataIndex: 'updateTime',
      align: 'center',
      render(val: Date) {
        return <>{ dayjs(val).format('YYYY-MM-DD HH:mm:ss') }</>
      }
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="primary" danger onClick={() => handleDel(record)}>删除</Button>
        </Space>
      ),
    },
  ]

  const handleEdit = (record: any) => {
    history.push(`/article/edit?id=${record.id}`)
  }

  const handleDel = async (record: any) => {
    Modal.confirm({
      title: '提示',
      content: "是否删除此数据？",
      onOk() {
        articleDelApi(record.id)
      },
      onCancel() {
        message.info('已取消删除')
      }
    })
  }

  /**
   * 
   * @description 删除文章
   */
  const articleDelApi = async (id: number) => {
    try {
      if(loading) {
        return 
      }
  
      setLoading(true)

      const res: any = await articleDel({ id })

      if(res.code === 200) {
        message.success('删除成功')
        articleListApi(current)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 
   * @description 获取文章列表
   */
  const articleListApi = async (pageNo = 1, pageSize = 10) => {
    try {
      if(loading) {
        return 
      }
  
      setLoading(true)

      const res: any = await articleList({ pageSize, pageNo })

      if(res.code === 200) {
        const list = res.data.list.map((item: any) => ({
          ...item,
          tags: item.tags.split(','),
        }))

        setCount(res.data.count)
        setList(list)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    articleListApi(current)
  }, [])

  const handlePaginationChange = (pageNo: number) => {
    setCurrent(pageNo)
    articleListApi(pageNo)
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={(row: any) => row.id}
        loading={loading}
        pagination={{
          total: count,
          pageSize: 10,
          current: current,
          onChange: handlePaginationChange
        }}
      />
    </div>
  );
}

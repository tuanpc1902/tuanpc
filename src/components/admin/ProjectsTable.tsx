import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Space, Tag, Popconfirm, Tooltip } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PushpinOutlined,
  HolderOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import type { Project } from '~alias~/lib/projects';
import './ProjectsTable.styles.scss';

interface ProjectsTableProps {
  data: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
  onTogglePin: (id: string) => void;
  onToggleHide: (id: string) => void;
  t: (key: string) => string;
  language: 'vi' | 'en';
}

interface SortableRowProps {
  project: Project;
  children: React.ReactNode;
  onTogglePin: (id: string) => void;
  onToggleHide: (id: string) => void;
  t: (key: string) => string;
}

function SortableRow({ project, children, onTogglePin, onToggleHide, t }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'dragging' : ''}
      onClick={(e) => {
        // Prevent row click from interfering with button clicks
        if ((e.target as HTMLElement).closest('button, .ant-btn')) {
          return;
        }
      }}
    >
      <td className="drag-handle-cell">
        <div
          {...attributes}
          {...listeners}
          className="drag-handle"
          title={t('dragToReorder')}
        >
          <HolderOutlined />
        </div>
      </td>
      <td className="pin-cell">
        <Tooltip title={project.pinned ? t('unpin') : t('pin')}>
          <Button
            type="text"
            icon={<PushpinOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(project.id);
            }}
            className={project.pinned ? 'pinned' : ''}
            size="small"
          />
        </Tooltip>
      </td>
      <td className="hide-cell">
        <Tooltip title={project.hidden ? t('show') : t('hide')}>
          <Button
            type="text"
            icon={project.hidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleHide(project.id);
            }}
            className={project.hidden ? 'hidden' : ''}
            size="small"
          />
        </Tooltip>
      </td>
      {children}
    </tr>
  );
}

export function ProjectsTable({
  data,
  onEdit,
  onDelete,
  onReorder,
  onTogglePin,
  onToggleHide,
  t,
  language,
}: ProjectsTableProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorder(active.id as string, over.id as string);
    }
  };

  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t('name'),
        cell: (info) => info.getValue(),
        size: 200,
      },
      {
        accessorKey: 'description',
        header: t('description'),
        cell: (info) => {
          const desc = info.getValue() as string;
          return <span className="table-description">{desc}</span>;
        },
      },
      {
        accessorKey: 'icon',
        header: t('icon'),
        cell: (info) => <span className="table-icon">{info.getValue() as string}</span>,
        size: 80,
      },
      {
        accessorKey: 'category',
        header: t('category'),
        cell: (info) => info.getValue(),
        size: 150,
      },
      {
        accessorKey: 'tags',
        header: t('tags'),
        cell: (info) => {
          const tags = info.getValue() as string[];
          return (
            <Space size={[0, 8]} wrap>
              {tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Space>
          );
        },
      },
      {
        accessorKey: 'featured',
        header: t('featured'),
        cell: (info) => {
          const featured = info.getValue() as boolean;
          return featured ? '✓' : '-';
        },
        size: 100,
      },
      {
        id: 'actions',
        header: t('actions'),
        cell: (info) => {
          const project = info.row.original;
          return (
            <Space>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => onEdit(project)}
              >
                {t('edit')}
              </Button>
              <Popconfirm
                title={t('deleteProjectConfirm')}
                onConfirm={() => onDelete(project.id)}
                okText={t('delete')}
                cancelText={t('cancel')}
              >
                <Button type="link" danger icon={<DeleteOutlined />}>
                  {t('delete')}
                </Button>
              </Popconfirm>
            </Space>
          );
        },
        size: 150,
        enableSorting: false,
      },
    ],
    [t, onEdit, onDelete]
  );

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      // Pinned projects first
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      // Then by order
      return (a.order || 0) - (b.order || 0);
    });
  }, [data]);

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="react-table-wrapper">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="react-table-container">
          <table className="react-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <th className="drag-handle-header" style={{ width: 50 }}></th>
                  <th className="pin-header" style={{ width: 50 }}></th>
                  <th className="hide-header" style={{ width: 50 }}>
                    {language === 'vi' ? 'Ẩn' : 'Hide'}
                  </th>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <SortableContext
              items={sortedData.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 3} className="empty-cell">
                      {language === 'vi' ? 'Không có dữ liệu' : 'No data'}
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => {
                    const project = row.original;
                    return (
                      <SortableRow
                        key={row.id}
                        project={project}
                        onTogglePin={onTogglePin}
                        onToggleHide={onToggleHide}
                        t={t}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </SortableRow>
                    );
                  })
                )}
              </tbody>
            </SortableContext>
          </table>
        </div>
      </DndContext>
      <div className="react-table-pagination">
        <div className="pagination-info">
          {language === 'vi'
            ? `Trang ${table.getState().pagination.pageIndex + 1} / ${table.getPageCount()} (Tổng ${sortedData.length} dự án)`
            : `Page ${table.getState().pagination.pageIndex + 1} / ${table.getPageCount()} (Total ${sortedData.length} projects)`}
        </div>
        <div className="pagination-controls">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            size="small"
          >
            {language === 'vi' ? 'Trước' : 'Previous'}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            size="small"
          >
            {language === 'vi' ? 'Sau' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}

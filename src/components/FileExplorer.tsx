
import React, { useState } from 'react'
import { ChevronRight, Grid, List, Home, Folder, File, Settings, ChevronDown } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../lib/utils'

interface FileItem {
  name: string
  type: 'file' | 'folder'
  size?: string
  modified?: string
}

export function FileExplorer() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const dummyFiles: FileItem[] = [
    { name: 'Documents', type: 'folder', modified: '2024-02-19' },
    { name: 'Pictures', type: 'folder', modified: '2024-02-18' },
    { name: 'report.docx', type: 'file', size: '2.5 MB', modified: '2024-02-17' },
    { name: 'presentation.pptx', type: 'file', size: '5.8 MB', modified: '2024-02-16' },
  ]

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={cn(
      'h-screen flex flex-col',
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    )}>
      {/* Top Menu Bar */}
      <div className={cn(
        'flex items-center p-1 border-b',
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      )}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            File
            <ChevronDown className="inline ml-1 w-4 h-4" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className={cn(
              'min-w-[200px] rounded-lg shadow-lg p-2',
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            )}>
              <DropdownMenu.Item className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                New Folder
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                New File
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-2 h-px bg-gray-200 dark:bg-gray-700" />
              <DropdownMenu.Item className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                Exit
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <button
          onClick={toggleTheme}
          className="ml-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={cn(
          'w-64 p-4 border-r overflow-y-auto',
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        )}>
          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <Home className="w-4 h-4 mr-2" />
            <span>Home</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <Folder className="w-4 h-4 mr-2" />
            <span>Documents</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <Folder className="w-4 h-4 mr-2" />
            <span>Pictures</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Breadcrumb */}
          <div className={cn(
            'flex items-center p-2 border-b',
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          )}>
            <span className="hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded cursor-pointer">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded cursor-pointer">Documents</span>
          </div>

          {/* View Toggle */}
          <div className="flex items-center p-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-lg mr-2',
                viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-lg',
                viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Files Display */}
          <div className={cn(
            'flex-1 p-4 overflow-y-auto',
            viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'flex flex-col space-y-2'
          )}>
            {dummyFiles.map((file, index) => (
              <div
                key={index}
                className={cn(
                  'group cursor-pointer',
                  viewMode === 'grid'
                    ? 'p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex flex-col items-center'
                    : 'p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center'
                )}
              >
                {file.type === 'folder' ? (
                  <Folder className={cn(
                    'group-hover:text-blue-500',
                    viewMode === 'grid' ? 'w-16 h-16 mb-2' : 'w-6 h-6 mr-3'
                  )} />
                ) : (
                  <File className={cn(
                    'group-hover:text-blue-500',
                    viewMode === 'grid' ? 'w-16 h-16 mb-2' : 'w-6 h-6 mr-3'
                  )} />
                )}
                <div className={viewMode === 'grid' ? 'text-center' : 'flex-1'}>
                  <div className="font-medium">{file.name}</div>
                  {viewMode === 'list' && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {file.size && <span className="mr-4">{file.size}</span>}
                      {file.modified}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className={cn(
        'p-2 border-t flex items-center text-sm',
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      )}>
        <span>{dummyFiles.length} items</span>
      </div>
    </div>
  )
}
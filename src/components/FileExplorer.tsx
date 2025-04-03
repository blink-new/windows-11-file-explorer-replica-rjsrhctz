
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
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div className="win-window h-full">
      {/* Title Bar */}
      <div className="win-titlebar">
        <div className="flex items-center space-x-2">
          <Folder className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">File Explorer</span>
        </div>
        <button
          onClick={toggleTheme}
          className="win-button-icon"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Menu Bar */}
      <div className="flex items-center p-1 border-b border-border bg-card">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="win-button text-sm">
            File
            <ChevronDown className="inline ml-1 w-4 h-4" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="win-menu animate-fade-in">
              <DropdownMenu.Item className="win-menu-item">
                New Folder
              </DropdownMenu.Item>
              <DropdownMenu.Item className="win-menu-item">
                New File
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-2 h-px bg-border" />
              <DropdownMenu.Item className="win-menu-item">
                Exit
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-border bg-card/50">
          <div className="p-2 space-y-1">
            <button className="win-menu-item w-full justify-start">
              <Home className="w-4 h-4 mr-3" />
              <span>Home</span>
            </button>
            <button className="win-menu-item w-full justify-start">
              <Folder className="w-4 h-4 mr-3" />
              <span>Documents</span>
            </button>
            <button className="win-menu-item w-full justify-start">
              <Folder className="w-4 h-4 mr-3" />
              <span>Pictures</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Breadcrumb */}
          <div className="flex items-center p-2 border-b border-border bg-card/50">
            <button className="win-menu-item py-1">Home</button>
            <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
            <button className="win-menu-item py-1">Documents</button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center p-2 bg-card/50">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'win-button-icon mr-1',
                viewMode === 'grid' && 'bg-accent text-accent-foreground'
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'win-button-icon',
                viewMode === 'list' && 'bg-accent text-accent-foreground'
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Files Display */}
          <div className={cn(
            'flex-1 p-4 overflow-y-auto bg-background',
            viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'flex flex-col space-y-1'
          )}>
            {dummyFiles.map((file, index) => (
              <div
                key={index}
                className={cn(
                  'group animate-fade-in',
                  viewMode === 'grid'
                    ? 'win-card hover:bg-accent hover:text-accent-foreground flex flex-col items-center p-4'
                    : 'win-menu-item'
                )}
              >
                {file.type === 'folder' ? (
                  <Folder className={cn(
                    'text-primary',
                    viewMode === 'grid' ? 'w-16 h-16 mb-2' : 'w-5 h-5 mr-3'
                  )} />
                ) : (
                  <File className={cn(
                    'text-primary',
                    viewMode === 'grid' ? 'w-16 h-16 mb-2' : 'w-5 h-5 mr-3'
                  )} />
                )}
                <div className={viewMode === 'grid' ? 'text-center' : 'flex-1'}>
                  <div className="font-medium">{file.name}</div>
                  {viewMode === 'list' && (
                    <div className="text-sm text-muted-foreground">
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
      <div className="win-titlebar justify-start text-sm">
        <span>{dummyFiles.length} items</span>
      </div>
    </div>
  )
}
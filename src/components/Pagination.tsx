import React, {FC, useState} from 'react'

import {TabContainer, TabList, PageButton} from '@/styled/Pagination'

// import PageButton, {TabList, TabContainer} from 'System/Pagination'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

const getRange = (from: number, to: number, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

type IPagination = {
  totalRecords: number
  pageLimit?: number
  pageNeighbours?: 0 | 1 | 2
  onPageChanged: (...args: any[]) => any
}

const Pagination: FC<IPagination> = ({
  totalRecords,
  pageLimit = 30,
  pageNeighbours = 0,
  onPageChanged,
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(totalRecords / pageLimit)

  const gotoPage = (page: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages))

    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
      totalRecords,
    }

    setCurrentPage(currentPage)
    onPageChanged(paginationData)
  }

  const handleClick = (page: number) => (e: any) => {
    console.log(page)
    e.preventDefault()
    gotoPage(page)
  }

  const handleMoveLeft = (e: any) => {
    e.preventDefault()
    gotoPage(currentPage - pageNeighbours * 2 - 1)
  }

  const handleMoveRight = (e: any) => {
    e.preventDefault()
    gotoPage(currentPage + pageNeighbours * 2 + 1)
  }

  const fetchPageNumbers = () => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

      let pages = getRange(startPage, endPage) as any

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = getRange(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = getRange(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages]
    }

    return getRange(1, totalPages)
  }
  const pages = fetchPageNumbers()
  if (!totalRecords || totalPages === 1) return null
  return (
    <>
      <TabContainer>
        <TabList>
          {pages.map((page, idx) => {
            if (page === LEFT_PAGE) {
              return (
                <li key="BUTTON_PREV">
                  <PageButton
                    onClick={e => {
                      handleMoveLeft(e)
                    }}
                  >
                    <span>&laquo;</span>
                  </PageButton>
                </li>
              )
            }

            if (page === RIGHT_PAGE) {
              return (
                <li key="BUTTON_NEXT">
                  <PageButton onClick={e => handleMoveRight(e)}>
                    <span>&raquo;</span>
                  </PageButton>
                </li>
              )
            }
            return (
              <li key={`PAGE-${idx}`}>
                <PageButton
                  selected={currentPage === page}
                  onClick={handleClick(page)}
                >
                  {page}
                </PageButton>
              </li>
            )
          })}
        </TabList>
      </TabContainer>
    </>
  )
}

export default Pagination

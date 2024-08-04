import { computed } from 'vue'

interface Page {
  value: number
  active: boolean
}

const useLaravelPagination = (
  total: number,
  perPage: number,
  currentPage: number
) =>
  computed(() => {
    const totalPages = Math.ceil(total! / perPage!)
    const pages: Page[] = []

    for (let i = 1; i <= totalPages; i++) {
      const pagesToshow = currentPage === 1 ? 2 : 1
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage! - pagesToshow && i <= currentPage! + pagesToshow)
      ) {
        pages.push({
          value: i,
          active: i === currentPage!,
        })
      }
    }

    return pages
  })

export default useLaravelPagination

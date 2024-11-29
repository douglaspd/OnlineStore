import { Dispatch, SetStateAction, useState } from 'react';
import { CategoryType } from '../../@types/CategoryType';
import { ProductType } from '../../@types/ProductType';
import { getProductsByCategory } from '../../services/api';
import Category from './Category';

type AsideProps = {
  categories: CategoryType[],
  setSearchedProducts: Dispatch<SetStateAction<ProductType[] | undefined>>,
  setCategoriesVisibility: Dispatch<SetStateAction<boolean>>,
  categoriesVisibility: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
};

function Aside({ categories, setSearchedProducts,
  categoriesVisibility, setCategoriesVisibility, setLoading }: AsideProps) {
  const [activeCategory, setActiveCategory] = useState<string>('');

  const getSelectedCategory = async (categoryId: string) => {
    setCategoriesVisibility(false);
    setLoading(true);
    setActiveCategory(categoryId);
    const { results } = await getProductsByCategory(categoryId);
    const data = results
      .map((products: ProductType) => {
        return products as ProductType;
      });
    setSearchedProducts(data as ProductType[]);
    setLoading(false);
  };

  return (
    <>
      <div className="h-12 w-full" />
      <aside
        className="flex flex-col w-full bg-white absolute z-40"
      >
        <button
          onClick={ () => { setCategoriesVisibility(!categoriesVisibility); } }
          className="mt-4 mb-4 mx-auto py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 ease-in-out 
            hover:bg-blue-600 hover:shadow-xl focus:outline-none"
        >
            Pesquise por categorias
        </button>
        <nav
          className={ `flex-col text-gray-600 font-normal 
        gap-2 px-6 top-14 bg-white overflow-y-scroll
        ${categoriesVisibility ? 'flex' : 'hidden'}` }
        >
          {
          categories.map((category) => (
            <Category
              key={ category.id }
              isActive={ activeCategory === category.id }
              handleClick={ () => { getSelectedCategory(category.id); } }
              name={ category.name }
            />
          ))
          }
        </nav>
      </aside>
      <button
        aria-label="fechar categorias"
        onClick={ () => { setCategoriesVisibility(false); } }
        className={ `${categoriesVisibility ? 'absolute' : 'hidden'}
        w-full h-full z-20 bg-black opacity-20` }
      />
    </>
  );
}

export default Aside;

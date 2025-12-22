import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Plus, Tag, Utensils } from "lucide-react";
import { ItemCategory } from "./components/ItemCategory";
import { useState } from "react";
import { CategoryModal } from "./components/CategoryModal";

export const Category = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
          <span>Organize suas transações por categorias</span>
        </div>
        <Button onClick={() => setOpenDialog(true)}>
          <Plus className="mr-2" size={16} />
          Nova categoria
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card row>
          <div className="flex flex-row gap-6 justify-start items-center p-6 bg-white rounded-2xl">
            <Tag className="text-gray-600" size={32} />
            <div className="flex-1 flex flex-col">
              <h2 className="text-gray-800 font-medium text-2xl">8</h2>
              <span className="text-gray-500 font-medium text-xs uppercase">
                Total de categorias
              </span>
            </div>
          </div>
        </Card>
        <Card row>
          <div className="flex flex-row gap-6 justify-start items-center p-6 bg-white rounded-2xl">
            <ArrowUpDown className="text-purple-base" size={32} />
            <div className="flex-1 flex flex-col">
              <h2 className="text-gray-800 font-medium text-2xl">27</h2>
              <span className="text-gray-500 font-medium text-xs uppercase">
                Total de Transações
              </span>
            </div>
          </div>
        </Card>
        <Card row>
          <div className="flex flex-row gap-6 justify-start items-center p-6 bg-white rounded-2xl">
            <Utensils className="text-blue-base" size={32} />
            <div className="flex-1 flex flex-col">
              <h2 className="text-gray-800 font-medium text-2xl">
                Alimentação
              </h2>
              <span className="text-gray-500 font-medium text-xs uppercase">
                categoria mais utilizada
              </span>
            </div>
          </div>
        </Card>
      </div>
      <section className="grid lg:grid-cols-4 gap-4">
        <ItemCategory
          category={{
            id: "2",
            title: "Entretenimento",
            description: "Cinema, jogos e lazer",
            color: "pink",
            icon: "ticket",
          }}
        />
        <ItemCategory
          category={{
            id: "1",
            title: "Alimentação",
            description: "Despesas com alimentação",
            color: "blue",
            icon: "utensils",
          }}
        />
        <ItemCategory
          category={{
            id: "3",
            title: "Investimentos",
            description: "Aplicações e retornos financeiros",
            color: "green",
            icon: "piggy_bank",
          }}
        />
        <ItemCategory
          category={{
            id: "4",
            title: "Mercado",
            description: "Compras de supermercado e mantimentos",
            color: "orange",
            icon: "shopping_cart",
          }}
        />
        <ItemCategory
          category={{
            id: "5",
            title: "Salário",
            description: "Renda mensal e bonificações",
            color: "green",
            icon: "briefcase_business",
          }}
        />
        <ItemCategory
          category={{
            id: "6",
            title: "Saúde",
            description: "Medicamentos, consultas e exames",
            color: "red",
            icon: "heart_pulse",
          }}
        />
        <ItemCategory
          category={{
            id: "7",
            title: "Transportes",
            description: "Gasolina, transporte público e viagens",
            color: "purple",
            icon: "car_front",
          }}
        />
        <ItemCategory
          category={{
            id: "8",
            title: "Utilidades",
            description: "Energia, água, internet e luz",
            color: "yellow",
            icon: "tool_case",
          }}
        />
      </section>
      <CategoryModal open={openDialog} onOpenChange={setOpenDialog} />
    </div>
  );
};

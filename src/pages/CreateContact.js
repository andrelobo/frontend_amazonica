import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateContact = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    endereco: "",
    bairro: "",
    cpf: "",
    forma_pagamento: "",
    prescricao: "",
    codigo_armacao: "",
    codigo_lente: "",
    compras: [
      {
        valor_total: 0,
        quantidade_parcelas: 0,
        parcelas: [
          {
            numero: 0,
            valor: 0,
            data_vencimento: "",
            status: "pendente",
          },
        ],
      },
    ],
    preco: 0,
    phone: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:7777/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userDetails),
    });

    const result = await res.json();
    if (!result.error) {
      toast.success(`Created [${userDetails.name}] contact`);
      setUserDetails({
        name: "",
        address: "",
        email: "",
        endereco: "",
        bairro: "",
        cpf: "",
        forma_pagamento: "",
        prescricao: "",
        codigo_armacao: "",
        codigo_lente: "",
        compras: [
          {
            valor_total: 0,
            quantidade_parcelas: 0,
            parcelas: [
              {
                numero: 0,
                valor: 0,
                data_vencimento: "",
                status: "pendente",
              },
            ],
          },
        ],
        preco: 0,
        phone: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <h2>Criar Contato</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
           Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressInput" className="form-label mt-4">
            Endereço
          </label>
          <input
            type="text"
            className="form-control"
            id="addressInput"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            placeholder="WalkStreet 05, California"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="enderecoInput" className="form-label mt-4">
            Endereço
          </label>
          <input
            type="text"
            className="form-control"
            id="enderecoInput"
            name="endereco"
            value={userDetails.endereco}
            onChange={handleInputChange}
            placeholder="Rua XYZ, 123"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bairroInput" className="form-label mt-4">
            Bairro
          </label>
          <input
            type="text"
            className="form-control"
            id="bairroInput"
            name="bairro"
            value={userDetails.bairro}
            onChange={handleInputChange}
            placeholder="Bairro ABC"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpfInput" className="form-label mt-4">
            CPF
          </label>
          <input
            type="text"
            className="form-control"
            id="cpfInput"
            name="cpf"
            value={userDetails.cpf}
            onChange={handleInputChange}
            placeholder="123.456.789-00"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="formaPagamentoInput" className="form-label mt-4">
            Forma de Pagamento
          </label>
          <input
            type="text"
            className="form-control"
            id="formaPagamentoInput"
            name="forma_pagamento"
            value={userDetails.forma_pagamento}
            onChange={handleInputChange}
            placeholder="Dinheiro"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prescricaoInput" className="form-label mt-4">
            Prescricao
          </label>
          <textarea
            className="form-control"
            id="prescricaoInput"
            name="prescricao"
            value={userDetails.prescricao}
            onChange={handleInputChange}
            placeholder="Descrição da prescrição"
          />
        </div>
        <div className="form-group">
          <label htmlFor="codigoArmacaoInput" className="form-label mt-4">
            Código da Armação
          </label>
          <input
            type="text"
            className="form-control"
            id="codigoArmacaoInput"
            name="codigo_armacao"
            value={userDetails.codigo_armacao}
            onChange={handleInputChange}
            placeholder="C123"
          />
        </div>
        <div className="form-group">
          <label htmlFor="codigoLenteInput" className="form-label mt-4">
            Código da Lente
          </label>
          <input
            type="text"
            className="form-control"
            id="codigoLenteInput"
            name="codigo_lente"
            value={userDetails.codigo_lente}
            onChange={handleInputChange}
            placeholder="L456"
          />
        </div>
        <div className="form-group">
          <label htmlFor="valorTotalInput" className="form-label mt-4">
            Total da Compra
          </label>
          <input
            type="number"
            className="form-control"
            id="valorTotalInput"
            name="compras[0].valor_total"
            value={userDetails.compras[0].valor_total}
            onChange={handleInputChange}
            placeholder="100.00"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantidadeParcelasInput" className="form-label mt-4">
            Quantidade de Parcelas
          </label>
          <input
            type="number"
            className="form-control"
            id="quantidadeParcelasInput"
            name="compras[0].quantidade_parcelas"
            value={userDetails.compras[0].quantidade_parcelas}
            onChange={handleInputChange}
            placeholder="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="valorParcelaInput" className="form-label mt-4">
            Valor da Parcela
          </label>
          <input
            type="number"
            className="form-control"
            id="valorParcelaInput"
            name="compras[0].parcelas[0].valor"
            value={userDetails.compras[0].parcelas[0].valor}
            onChange={handleInputChange}
            placeholder="33.33"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataVencimentoParcelaInput" className="form-label mt-4">
            Data de Vencimento da Parcela
          </label>
          <input
            type="date"
            className="form-control"
            id="dataVencimentoParcelaInput"
            name="compras[0].parcelas[0].data_vencimento"
            value={userDetails.compras[0].parcelas[0].data_vencimento}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="statusParcelaInput" className="form-label mt-4">
            Status da Parcela
          </label>
          <select
            className="form-select"
            id="statusParcelaInput"
            name="compras[0].parcelas[0].status"
            value={userDetails.compras[0].parcelas[0].status}
            onChange={handleInputChange}
          >
            <option value="pendente">Pendente</option>
            <option value="pago">Pago</option>
            <option value="atrasado">Atrasado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="precoInput" className="form-label mt-4">
            Preco
          </label>
          <input
            type="number"
            className="form-control"
            id="precoInput"
            name="preco"
            value={userDetails.preco}
            onChange={handleInputChange}
            placeholder="50.00"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneInput" className="form-label mt-4">
            Telefone
          </label>
          <input
            type="number"
            className="form-control"
            id="phoneInput"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            placeholder="+977 987654321"
            required
          />
        </div>
        <input type="submit" value="Add Contact" className="btn btn-info my-2" />
      </form>
    </>
  );
};

export default CreateContact;

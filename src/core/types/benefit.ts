export interface BenefitImage {
  src: string;
  name: string;
  type: string;
  old: string;
  del: string;
  size?: object;
}

export interface BenefitChild {
  id:number;
  name: string;
  link: string;
  detail: string;
  image: BenefitImage | null;
}

export interface BenefitData {
  id:number;
  name: string;
  link: string;
  detail: string;
  image: BenefitImage | null;
  children: BenefitChild[];
  list_customer: number[]
}

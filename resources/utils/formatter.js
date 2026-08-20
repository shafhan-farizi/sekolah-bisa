export const formatHonorificName = (name, gender) => {
  if(!name) return '';

  const prefix = gender === "Laki-laki" ? "Ayah" : "Bunda";

  const formatName = name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return `${prefix} ${formatName}`;
};

export const formatTeacherName = (name, gender, title) => {
  if(!name) return '';

  const prefix = gender === "Laki-laki" ? "Ustadz" : "Ustadzah";

  const formatName = name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return `${prefix} ${formatName}, ${title}`;
};

export const formatDate = (date, config = 'long') => {
  if(!date) return '-';

  const formatConfigs = {
    long: {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    short: {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    dayMonth: {
      weekday: "long",
      day: "numeric",
      month: "long"
    }
  };

  const configSelected = formatConfigs[config];

  return Intl.DateTimeFormat("id-ID", configSelected).format(new Date(date));
} 

export const formatMoney = (money) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(money);
}

export const getInitials = (fullName) => {
  if(!fullName) return '?'

  const names = fullName.trim().split(' ')

  if(names.length === 1) return names[0].charAt(0).toUpperCase()

  const firstInitial = names[0].charAt(0).toUpperCase()
  const lastInitial = names[names.length - 1].charAt(0).toUpperCase()

  return `${firstInitial}${lastInitial}`
}